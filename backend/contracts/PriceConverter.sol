// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

    function getPrice() internal view returns (uint256) {
        // the address is for ETH / USD 0x694AA1769357215DE4FAC081bf1f309aDC325306
        // usd recieved is 1USD/1e8
        // you can use the priceFeed.decimals() function to check
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // sepolia >< ETH/USD
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e); // goerli >< ETH/USD

        // we used int256 instead of uint256 because it may be -ve
        ( , int256 answer, , ,) = priceFeed.latestRoundData(); 

        // to get our dollar (1e8) to match up with ether 1e18
        return uint256(answer * 1e10);
        
    }

    function getVersion() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();

    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmtInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmtInUsd;
    }
}