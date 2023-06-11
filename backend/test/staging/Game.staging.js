const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("OnlineSafetyGame Staging Tests", function () {
          let onlineSafetyGame, gameEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              onlineSafetyGame = await ethers.getContract("OnlineSafetyGame", deployer)
              gameEntranceFee = await onlineSafetyGame.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  // enter the onlineSafetyGame
                  console.log("Setting up test...")
                  const startingTimeStamp = await onlineSafetyGame.getLastTimeStamp()
                  const accounts = await ethers.getSigners()

                  console.log("Setting up Listener...")
                  await new Promise(async (resolve, reject) => {
                      // setup listener before we enter the onlineSafetyGame
                      // Just in case the blockchain moves REALLY fast
                      onlineSafetyGame.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              // add our asserts here
                              const recentWinner = await onlineSafetyGame.getAWinner(0)
                              const gameState = await onlineSafetyGame.getGameState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await onlineSafetyGame.getLastTimeStamp()

                              await expect(onlineSafetyGame.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(gameState, 0)
                            //   assert.equal(
                            //       winnerEndingBalance.toString(),
                            //       winnerStartingBalance.add(gameEntranceFee).toString()
                            //   )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })
                      // Then entering the onlineSafetyGame
                      console.log("Entering OnlineSafetyGame...")
                      const tx = await onlineSafetyGame.enterGame({ value: gameEntranceFee })
                      await tx.wait(1)
                      console.log("Ok, time to wait...")
                      const winnerStartingBalance = await accounts[0].getBalance()

                      // and this code WONT complete until our listener has finished listening!
                  })
              })
          })
      })
