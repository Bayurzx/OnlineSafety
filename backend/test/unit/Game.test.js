const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Game Unit Tests", function () {
          let game, gameContract, vrfCoordinatorV2Mock, gameEntranceFee, interval, player, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners() // could also do with getNamedAccounts
              deployer = (await getNamedAccounts()).deployer
              //   deployer = accounts[0]
              player = accounts[1]
              await deployments.fixture(["mocks", "game"]) // Deploys modules with the tags "mocks" and "game"
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);

              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock") // Returns a new connection to the VRFCoordinatorV2Mock contract
              gameContract = await ethers.getContract("OnlineSafetyGame") // Returns a new connection to the Game contract
              game = gameContract.connect(player) // Returns a new instance of the Game contract connected to player
              gameEntranceFee = await game.getEntranceFee()
              interval = await game.getInterval()
          })

          describe("constructor", function () {
              it("initializes the game correctly", async () => {
                  // Ideally, we'd separate these out so that only 1 assert per "it" block
                  // And ideally, we'd make this check everything
                  const gameState = (await game.getGameState()).toString()
                  // Comparisons for Game initialization:
                  assert.equal(gameState, "0")
                  assert.equal(
                      interval.toString(),
                      networkConfig[network.config.chainId]["keepersUpdateInterval"]
                  )
              })
          })

          describe("enterGame", function () {
              it("reverts when you don't pay enough", async () => {
                  await expect(game.enterGame()).to.be.revertedWith( // is reverted when not paid enough or game is not open
                      "Game__SendMoreToEnterGame"
                  )
              })
              it("records player when they enter", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  const contractPlayer = await game.getPlayer(0)
                  assert.equal(player.address, contractPlayer)
              })
              it("emits event on enter", async () => {
                  await expect(game.enterGame({ value: gameEntranceFee })).to.emit( // emits GameEnter event if entered to index player(s) address
                      game,
                      "GameEnter"
                  )
              })
              it("doesn't allow entrance when game is calculating", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  // for a documentation of the methods below, go here: https://hardhat.org/hardhat-network/reference
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  // we pretend to be a keeper for a second
                  await game.performUpkeep([]) // changes the state to calculating for our comparison below
                  await expect(game.enterGame({ value: gameEntranceFee })).to.be.revertedWith( // is reverted as game is calculating
                      "Game__NotOpen"
                  )
              })
          })
          describe("checkUpkeep", function () {
              it("returns false if people haven't sent any ETH", async () => {
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await game.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(!upkeepNeeded)
              })
              it("returns false if game isn't open", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  await game.performUpkeep([]) // changes the state to calculating
                  const gameState = await game.getGameState() // stores the new state
                  const { upkeepNeeded } = await game.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert.equal(gameState.toString() == "1", upkeepNeeded == false)
              })
              it("returns false if enough time hasn't passed", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() - 5]) // use a higher number here if this test fails
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await game.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(!upkeepNeeded)
              })
              it("returns true if enough time has passed, has players, eth, and is open", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await game.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(upkeepNeeded)
              })
          })

          describe("performUpkeep", function () {
              it("can only run if checkupkeep is true", async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const tx = await game.performUpkeep("0x") 
                  assert(tx)
              })
              it("reverts if checkup is false", async () => {
                  await expect(game.performUpkeep("0x")).to.be.revertedWith( 
                      "Game__UpkeepNotNeeded"
                  )
              })
              it("updates the game state and emits a requestId", async () => {
                  // Too many asserts in this test!
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const txResponse = await game.performUpkeep("0x") // emits requestId
                  const txReceipt = await txResponse.wait(1) // waits 1 block
                  const gameState = await game.getGameState() // updates state
                  const requestId = txReceipt.events[1].args.requestId
                  assert(requestId.toNumber() > 0)
                  assert(gameState == 1) // 0 = open, 1 = calculating
              })
          })
          describe("fulfillRandomWords", function () {
              beforeEach(async () => {
                  await game.enterGame({ value: gameEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
              })
              it("can only be called after performupkeep", async () => {
                  await expect(
                      vrfCoordinatorV2Mock.fulfillRandomWords(0, game.address) // reverts if not fulfilled
                  ).to.be.revertedWith("nonexistent request")
                  await expect(
                      vrfCoordinatorV2Mock.fulfillRandomWords(1, game.address) // reverts if not fulfilled
                  ).to.be.revertedWith("nonexistent request")
              })




            // This test is too big...
            // This test simulates users entering the game and wraps the entire functionality of the game
            // inside a promise that will resolve if everything is successful.
            // An event listener for the WinnerPicked is set up
            // Mocks of chainlink keepers and vrf coordinator are used to kickoff this winnerPicked event
            // All the assertions are done once the WinnerPicked event is fired
              it("picks a winner, resets, and sends money", async () => {
                  const additionalEntrances = 5; // to test
                  const startingIndex = 2;
                  for (let i = startingIndex; i < startingIndex + additionalEntrances; i++) {
                      // i = 2; i < 5; i=i+1
                      game = gameContract.connect(accounts[i]); // Returns a new instance of the Game contract connected to player
                      await game.enterGame({ value: gameEntranceFee });
                      await game.updatePlayerScore(i);
                  }
                  console.log("loop passed");
                  const startingTimeStamp = await game.getLastTimeStamp(); // stores starting timestamp (before we fire our event)

                  // This will be more important for our staging tests...
                  await new Promise(async (resolve, reject) => {
                      game.once("RequestGameWinner", async () => {
                          console.log("RequestGameWinner event fired!");
                          // assert throws an error if it fails, so we need to wrap
                          // it in a try/catch so that the promise returns event
                          // if it fails.
                          try {
                              // Now let's get the ending values...
                              const first = await game.getFirst();
                              const second = await game.getSecond();
                              const third = await game.getThird();
                              const gameState = await game.getGameState();
                              const winnerBalance = await accounts[2].getBalance();
                              const endingTimeStamp = await game.getLastTimeStamp();
                              await expect(game.getAPrevWinner(0)).to.be.reverted;
                              // Comparisons to check if our ending values are correct:

                              assert.equal(first[0].toString(), accounts[6].address);
                              console.log("first");
                              assert.equal(second[0].toString(), accounts[5].address);
                              console.log("second");
                              assert.equal(third[0].toString(), accounts[4].address);
                              console.log("third");

                              //   assert.equal(
                            //       winnerBalance.toString(),
                            //       startingBalance
                            //           .add(
                            //               gameEntranceFee.mul(additionalEntrances).add(gameEntranceFee).mul(0.35)
                            //           )
                            //           .toString()
                            //   );
                              resolve(); // if try passes, resolves the promise 
                          } catch (e) {
                              reject(e); // if try fails, rejects the promise
                          }
                      });

                      // kicking off the event by mocking the VRF random number generation
                      const tx = await game.performUpkeep("0x");
                      const txReceipt = await tx.wait(1);
                      const startingBalance = await accounts[2].getBalance();
                      await game.fulfillRandomWords(
                          txReceipt.events[0].args.requestId,
                          game.address
                      );
                  });
              });
          })
      })
