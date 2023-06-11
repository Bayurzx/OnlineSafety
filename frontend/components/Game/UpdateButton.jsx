import React, { useContext, useEffect } from "react";
import Web3Context from "../../context/Web3Context";
import {  useWeb3Contract } from "react-moralis";




export const UpdateButton = ({ playerScore }) => {





    const {
        handleUpdateSuccess,
        handleError,

        gameAddress,
        abi

    } = useContext(Web3Context);

    const { runContractFunction: updatePlayerScore } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "updatePlayerScore",
        params: { calculatedScore: +playerScore },
    });





    
    const goBackHome = async () => {
        const update = await updatePlayerScore({
            // onComplete:
            onSuccess: handleUpdateSuccess,
            onError: (error) => handleError(error),
        });
        // console.log("\nUpdate", update, "\nearned", earned)

    }
    return (

        <>
            <button onClick={() => goBackHome()} className='tryAgain'>Submit Score</button>

        </>

    )
}
