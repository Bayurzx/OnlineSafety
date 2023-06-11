const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "259200",
        gameEntranceFee: ethers.utils.parseEther("0.005"), // 0.01 ETH
        callbackGasLimit: "1000000", // 500,000 gas
        priceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    11155111: {
        name: "sepolia",
        subscriptionId: "2160",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "259200",// change to 259200 -> 3 days /*1200 secs will (fail during tests)*/
        gameEntranceFee: ethers.utils.parseEther("0.005"), // 0.01 ETH
        callbackGasLimit: "1000000", // 500,000 gas
        vrfCoordinatorV2: "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625",
        priceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    1: {
        name: "mainnet",
        subscriptionId: "6926",
        gasLane: "0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef", // 200 gwei
        keepersUpdateInterval: "259200",
        gameEntranceFee: ethers.utils.parseEther("0.005"), // 0.01 ETH
        callbackGasLimit: "1000000", // 500,000 gas
        vrfCoordinatorV2: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
        priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../chain/constants/contractAddresses.json"
const frontEndAbiFile = "../chain/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndAbiFile
}