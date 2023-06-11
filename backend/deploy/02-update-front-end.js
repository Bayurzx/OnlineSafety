const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing constants to chain/constants dir...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Added the constants to chain/constants dir!")
    }
}

async function updateAbi() {
    const onlineSafetyGame = await ethers.getContract("OnlineSafetyGame")
    fs.writeFileSync(frontEndAbiFile, onlineSafetyGame.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const onlineSafetyGame = await ethers.getContract("OnlineSafetyGame")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(onlineSafetyGame.address)) {
            contractAddresses[network.config.chainId.toString()].push(onlineSafetyGame.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [onlineSafetyGame.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
