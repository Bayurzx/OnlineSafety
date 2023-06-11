// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// imports to help with true randomness and automate contract
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
// imports helps get the requestion eth conversion rate
// import "./PriceConverter.sol";

// Custom error for ownership validation
error OnlyOwnerCanMakeCall();

/* Errors */
error Game__SendMoreToEnterGame(uint256 requiredAmount, uint256 actualAmount);
error Game__TransferFailed();
error Game__NotOpen();
error Game__GameIsOver();
error Game__GameHasBeenPlayed7x();
error Game__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 s_players,
    uint256 gameState
);

// Custom error when transferring the nth place, lucky winners', owner's prize fails
error Game__nthPlaceTransferFailed();
error Game__LuckyPlayersTransferFailed();
error Game__OwnerTransferFailed();

/**
 * @title Online Safety Game Contract
 * @author Adebayo Omolumo
 * @notice Using what I have learn't from Patrick to create Online Safety Quizzy Game
 * @dev This implements AggregatorV3Interface, chainlink VRF V2 and chainlink Automations
 */

contract OnlineSafetyGame is VRFConsumerBaseV2, AutomationCompatible {
    // Using PriceConverter library for conversion
    // using PriceConverter for uint256;

    enum GameState {
        OPEN,
        CALCULATING
    }

    // on the event players send funds to contract address by accident
    event _fund(address indexed funder, uint256 amount);
    event _withdraw(uint256 indexed blockTimeStamp, uint256 amount);

    // important events during the game
    event GameEnter(address indexed player);
    event RequestGameWinner(uint256 indexed requestId);
    event WinnersPayed(
        address indexed winner1,
        address indexed winner2,
        address indexed winner3
    );
    event OwnerPayed(address indexed owner);
    event LuckyWinnersPayed(address payable luckyPlayer);

    struct Players_data {
        address player;
        uint256 score;
        uint256 winnings;
        uint256 hasPlayed;
        bool isPlaying;
    }

    mapping(address => uint256) public addressToAmountFunded;
    mapping(address => Players_data) public playersData;

    // Tracking accidental funders
    address[] public funders;

    address public immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 14; // at least 1 dollar (this was used wth price converter, due to complications it will be used in version 2)
    uint internal funding;
    uint internal totalBalance;

    // entrance fee determined on contract initialization, players allowed and last question
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    uint32 private constant LAST_QUESTION = 10;

    address payable[] private s_winners;

    // Player with the first, second and third highest score
    Players_data public first;
    Players_data public second;
    Players_data public third;

    // Debugging stores the block time for some callback function test, will remove in preoduction
    uint256 public stat_gameEndTime;
    uint256 public stat_checkUpkeepCalled;
    uint256 public stat_performUpkeepCalled;
    uint256 public stat_performUpkeepCalled2;
    uint256 public stat_fulfillRandomWordsTime;
    uint256 public stat_RandomNumber;

    // i_vrfCoordinator.requestRandomWords() function and it's args
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;

    // Game state
    GameState private s_gameState;
    uint public immutable i_interval;
    uint public s_lastTimeStamp;
    uint round;

    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane,
        uint256 interval,
        uint256 entranceFee,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);

        // Chainlink VRF Coordinator args
        i_gasLane = gasLane;
        i_interval = interval;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        i_entranceFee = entranceFee;

        // track the current game state
        s_gameState = GameState.OPEN;
        s_lastTimeStamp = block.timestamp;

        i_owner = msg.sender;
    }

    /**
     * @notice Enter the game by paying a specified amount in USD
     * @dev Requires the game to be open for entry. It initializes/reinitializes the player. I am not adding a way to block multiple plays yet because they could just use another account
     */
    function enterGame() external payable {
        /*Doesnt need public visibility */
        if (msg.value < i_entranceFee) {
            revert Game__SendMoreToEnterGame(i_entranceFee, msg.value);
        }

        if (s_gameState != GameState.OPEN) {
            revert Game__NotOpen();
        }
        funding = funding + msg.value;

        uint hasPlayed = playersData[msg.sender].hasPlayed + 1;
        uint winnings = playersData[msg.sender].winnings;
        playersData[msg.sender] = Players_data(
            msg.sender,
            0,
            winnings,
            hasPlayed,
            true
        );

        s_players.push(payable(msg.sender));
        emit GameEnter(msg.sender);
    }

    /**
     * @notice Updates the player's score based on the provided score and speed
     * @dev Requires the player to be currently playing the game
     * @param calculatedScore The score * speed achieved by the player
     */
    function updatePlayerScore(uint256 calculatedScore) external {
        if (!playersData[msg.sender].isPlaying) {
            revert Game__GameIsOver();
        }

        playersData[msg.sender].score =
            playersData[msg.sender].score +
            calculatedScore;
        assignRanking(msg.sender);
    }

    /**
     * @notice Assigns ranking to a player based on the provided score and address
     * @dev Updates the first, second, and third winners based on the current player's score,
     *      and checks if the game is over for the player
     * @param addr The address of the player
     */
    function assignRanking(address addr) internal {
        Players_data memory currPlayer;
        currPlayer = playersData[addr];

        if (currPlayer.score > first.score) {
            third = second;
            second = first;
            first = currPlayer;
        } else if (currPlayer.score > second.score) {
            third = second;
            second = currPlayer;
        } else if (currPlayer.score > third.score) {
            third = currPlayer;
        }
        playersData[addr].isPlaying = false;
    }

    function gameOver() external {
        playersData[msg.sender].isPlaying = false;
    }

    /**
     * @notice Checks whether upkeep is needed for the game
     * @dev Returns true if the game is open, enough time has passed, there are players, and there is balance available
     * @return upkeepNeeded Boolean indicating whether upkeep is needed
     */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bool isOpen = (GameState.OPEN == s_gameState);
        bool timePassed = (block.timestamp - s_lastTimeStamp) > i_interval;
        bool hasPlayers = (s_players.length > 0);
        bool hasBalance = (address(this).balance > 0);

        upkeepNeeded = (isOpen && timePassed && hasPlayers && hasBalance);

        return (upkeepNeeded, "0x0");
    }

    /**
     * @notice Performs the upkeep of the game by initiating the calculation of winners
     * @dev Reverts if the upkeep is not needed
     */
    function performUpkeep(bytes calldata /* performData */) external override {
        stat_checkUpkeepCalled = block.timestamp;

        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Game__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_gameState)
            );
        }

        stat_performUpkeepCalled = block.timestamp;

        s_gameState = GameState.CALCULATING;

        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        stat_performUpkeepCalled2 = block.timestamp;

        emit RequestGameWinner(requestId);
    }

    /**
     * @notice Fulfills the request for random words by updating game state and selecting winners
     * @dev Resets the player list, updates the last timestamp, sets the game state to open,
     *      adds the first, second, and third winners, and distributes the balance among winners
     * @param randomWords An array of random words used for winner selection
     */
    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        stat_RandomNumber = randomWords[0];
        stat_fulfillRandomWordsTime = block.timestamp;
        uint256 luckyIndex = randomWords[0] % s_players.length;
        address payable luckyWinner = s_players[luckyIndex];

        s_winners = new address payable[](0);

        s_winners.push(payable(first.player));
        s_winners.push(payable(second.player));
        s_winners.push(payable(third.player));
        s_winners.push(payable(luckyWinner));

        distributeBalance(s_winners);
    }

    /**
     * @notice Distributes the balance among the winners and other players
     * @dev Requires a minimum of 10 accounts, ensures sufficient balance, and distributes amounts to winners and other players
     * @param accounts An array of payable addresses representing the winners and other players
     */
    function distributeBalance(address payable[] memory accounts) internal {
        require(accounts.length >= 4, "Insufficient number of accounts");

        // uint256 totalBalance = address(this).balance;
        totalBalance = funding;

        uint256 firstPlaceAmount = (totalBalance * 35) / 100;
        uint256 secondPlaceAmount = (totalBalance * 20) / 100;
        uint256 thirdPlaceAmount = (totalBalance * 10) / 100;
        uint256 ownerAmount = (totalBalance * 5) / 100;
        uint256 luckyAmount = (totalBalance * 7) / 100;

        funding =
            funding -
            (luckyAmount +
                ownerAmount +
                thirdPlaceAmount +
                secondPlaceAmount +
                firstPlaceAmount);

        /**
         *
         * @notice Create backup functions owner can call if any of this fails
         */
        (bool firstPay, ) = accounts[0].call{value: firstPlaceAmount}("");
        // playersData[accounts[0]].winnings = firstPlaceAmount;
        playersData[accounts[0]] = Players_data(
            msg.sender,
            0,
            firstPlaceAmount,
            0,
            false
        );

        (bool secondPay, ) = accounts[1].call{value: secondPlaceAmount}("");
        // playersData[accounts[1]].winnings = secondPlaceAmount;
        playersData[accounts[1]] = Players_data(
            msg.sender,
            0,
            secondPlaceAmount,
            0,
            false
        );

        (bool thirdPay, ) = accounts[2].call{value: thirdPlaceAmount}("");
        // playersData[accounts[2]].winnings = thirdPlaceAmount;
        playersData[accounts[2]] = Players_data(
            msg.sender,
            0,
            thirdPlaceAmount,
            0,
            false
        );

        if (!(firstPay && secondPay && thirdPay)) {
            revert Game__nthPlaceTransferFailed();
        }

        emit WinnersPayed(accounts[0], accounts[1], accounts[2]);

        (bool luckyPay, ) = accounts[3].call{value: luckyAmount}("");
        playersData[accounts[3]].winnings = luckyAmount;

        if (!luckyPay) {
            revert Game__LuckyPlayersTransferFailed();
        }

        emit LuckyWinnersPayed(accounts[3]);

        (bool ownerPay, ) = i_owner.call{value: ownerAmount}("");
        if (!ownerPay) {
            revert Game__OwnerTransferFailed();
        }
        emit OwnerPayed(i_owner);

        stat_gameEndTime = block.timestamp;

        s_players = new address payable[](0);
        delete first;
        delete second;
        delete third;

        round++;
        s_lastTimeStamp = block.timestamp;
        s_gameState = GameState.OPEN;
    }

    /**
     * @notice Accepts funds and adds the sender to the list of funders
     * @dev Requires the sent value to meet a minimum conversion rate to USD
     */
    function fund() public payable {
        require(msg.value >= MINIMUM_USD, "You need to pay more ETH!");

        funders.push(msg.sender);
        emit _fund(msg.sender, msg.value);

        addressToAmountFunded[msg.sender] = msg.value;
    }

    /**
     * @notice This allows only the contract creator/owner to withdraw funds
     */
    function withdraw() public onlyOwner {
        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        uint256 currentBal = address(this).balance;

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call function failed");

        emit _withdraw(block.timestamp, currentBal);
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert OnlyOwnerCanMakeCall();
        }
        _;
    }

    /**
     * @dev The function will allow us track the most recent previous winners
     * @param index is the uint value for positions
     * @return The 0: first, 1: second, 2: third, 3: lucky,
     */

    function getAPrevWinner(uint256 index) public view returns (address) {
        return s_winners[index];
    }

    function getGameState() public view returns (GameState) {
        return s_gameState;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    /**
     *  @dev Retrieves the remaining time in seconds until the specified end time.
     *  @return The remaining time in seconds as a signed integer.
     *  This function allows tracking negative values, indicating that the end time has passed.
     */

    function getTimeLeft() public view returns (int) {
        // using int on the chance the value is -ve
        int currentTime = int(block.timestamp);
        int endTime = int(s_lastTimeStamp + i_interval);
        return endTime - currentTime;
    }

    function isGameOver() public view returns (bool) {
        return getTimeLeft() < 1;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getRemainingBalance() public view onlyOwner returns (int) {
        return int(totalBalance) - int(funding);
    }

    function getPlayersData()
        external
        view
        returns (address, uint, uint, uint, bool)
    {
        return (
            playersData[msg.sender].player,
            playersData[msg.sender].score,
            playersData[msg.sender].winnings,
            playersData[msg.sender].hasPlayed,
            playersData[msg.sender].isPlaying
        );
    }

    function getFirst() external view returns (address, uint) {
        return (first.player, first.score);
    }

    function getSecond() external view returns (address, uint) {
        return (second.player, second.score);
    }

    function getThird() external view returns (address, uint) {
        return (third.player, third.score);
    }

    function getRounds() external view returns (uint) {
        return round;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

}
