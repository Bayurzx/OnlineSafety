# Create the chainlink contract

## Purpose
- Allow users to purchase access with tokens
- Give out tokens with amount specified when called
- Integrate chainlinks external randomness attribute
- Other functions

### Allow users to purchase access with tokens
- Connect with users metamask wallet
- Sign them in
- Show the amount of tokens they have (not required)
- Identify if they have already paid in the past; else
  - Collect an amount of token from them
- Allow them access to play
- Game resets every 30 days

### Give out tokens with amount specified when called
- On the 28th day, a function is called to give out tokens according to the leaderboard
  - leaderboard board stats released on the 28 till next game
  - It seems the contract is updated every month
- 40% of the token generated is given to the top 10 players each month
- 20% of the token generated is given to 50 random player not in the top 10
  - We will use chainlink external access to enable true randomness
- We don't need to reset all access until we can design a contract that is automated yearly including leap years will be accounted for










# Bonus
- Users can only play once each month
  - The best route is shown in the end
  - I will implement a premium plan that allows you to have multiple retries 
    - Or you have to option of paying for the amount of retries you want
- The game changes introducing new possible scenarios each month or 60 days