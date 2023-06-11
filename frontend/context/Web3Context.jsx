import React, { createContext, useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";

import { contractAddresses, abi } from "../constants";
import { useRouter } from 'next/router';


// Create the Web3 context
const Web3Context = createContext();

// Create the Web3 provider component
export const Web3Provider = ({ children }) => {
    const [entranceFee, setEntranceFee] = useState("0");
    const [numberOfPlayers, setNumberOfPlayers] = useState("0");
    const [prevFirstWinner, setPrevFirstWinner] = useState("0");
    const [prevSecondWinner, setPrevSecondWinner] = useState("0");
    const [prevThirdWinner, setPrevThirdWinner] = useState("0");
    const [prevLuckyWinner, setPrevLuckyWinner] = useState("0");
    const [lastTimeStamp, setLastTimeStamp] = useState("")
    const [timeLeft, setTimeLeft] = useState("")
    const [playerData, setPlayerData] = useState(null)
    const [first, setFirst] = useState(null)
    const [second, setSecond] = useState(null)
    const [third, setThird] = useState(null)
    const [rounds, setRounds] = useState(0)
    const [isMovingToGame, setIsMovingToGame] = useState(false)
    const [playerScore, setPlayerScore] = useState(0);
    const [timer, setTimer] = useState(600)

    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();
    // These get re-rendered every time due to our connect button!
    // console.log(`account is`, account) 
    const chainId = parseInt(chainIdHex);
    const lastKnownAddress = contractAddresses[chainId]?.length - 1;
    const gameAddress = chainId in contractAddresses ? contractAddresses[chainId][lastKnownAddress] : null

    const router = useRouter();
    const dispatch = useNotification();

    const {
        runContractFunction: enterGame,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "enterGame",
        msgValue: entranceFee,
        params: {},
    });



    /* View Functions */

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getAPrevWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getAPrevWinner",
        params: { index: 0 }, // this `0` is a state you can change in the function
    });

    const { runContractFunction: getLastTimeStamp } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getLastTimeStamp",
        params: {},
    });

    const { runContractFunction: getTimeLeft } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getTimeLeft",
        params: {},
    });


    const { runContractFunction: getPlayersData } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getPlayersData",
        params: {},
    });

    // use like this
    //     onClick={() => runContractFunction({ params: options })}
    //     disabled={isFetching}
    // 

    const { runContractFunction: getFirst } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getFirst",
        params: {},
    });

    const { runContractFunction: getSecond } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getSecond",
        params: {},
    });

    const { runContractFunction: getThird } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getThird",
        params: {},
    });

    const { runContractFunction: getRounds } = useWeb3Contract({
        abi: abi,
        contractAddress: gameAddress,
        functionName: "getRounds",
        params: {},
    });


    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee())?.toString();
        console.log("entranceFeeFromCall", entranceFeeFromCall);
        const numPlayersFromCall = (await getNumberOfPlayers())?.toString();
        const roundsFromCall = (await getRounds())?.toString();
        const getLastTimeStampFromCall = (await getLastTimeStamp())?.toString();
        const getTimeLeftFromCall = (await getTimeLeft())?.toString();

        setEntranceFee(entranceFeeFromCall);
        setNumberOfPlayers(numPlayersFromCall);
        setRounds(roundsFromCall);
        setLastTimeStamp(getLastTimeStampFromCall);
        setTimeLeft(getTimeLeftFromCall);

    }

    const updatePlayersValues = async () => {
        const firstFromCall = await getFirst();
        const secondFromCall = await getSecond();
        const thirdFromCall = await getThird();
        console.log("firstFromCall",firstFromCall, "secondFromCall",secondFromCall, "thirdFromCall",thirdFromCall);
        const firstVal = {
            player: firstFromCall[0],
            score: +firstFromCall[1],
        }

        const secondVal = {
            player: secondFromCall[0],
            score: +secondFromCall[1],
        }

        const thirdVal = {
            player: firstFromCall[0],
            score: +thirdFromCall[1],
        }

        setFirst(firstVal);
        setSecond(secondVal);
        setThird(thirdVal);


    }

    const updateAccountValues = async () => {
        const getPlayersDataFromCall = (await getPlayersData())
        console.log("updateAccountValues", getPlayersDataFromCall);
        const accountData = {
            score: +getPlayersDataFromCall[1],
            winnings: +getPlayersDataFromCall[2],
            hasPlayed: +getPlayersDataFromCall[3],
            isPlaying: getPlayersDataFromCall[4],
        }
        setPlayerData(accountData);
        console.log("playerData", playerData);

    }

    const updateGameValues = async () => {



    }

    const updatePrevValues = async () => {
        const prevFirstWinnerFromCall = await getAPrevWinner(0);
        const prevSecondWinnerFromCall = await getAPrevWinner(1);
        const prevThirdWinnerFromCall = await getAPrevWinner(2);
        const prevLuckyWinnerFromCall = await getAPrevWinner(3);

        setPrevFirstWinner(prevFirstWinnerFromCall);
        setPrevSecondWinner(prevSecondWinnerFromCall);
        setPrevThirdWinner(prevThirdWinnerFromCall);
        setPrevLuckyWinner(prevLuckyWinnerFromCall);

    }

    const accountSlice = () => {
        return `${account.slice(0, 6)}...${account.slice(account.length - 4)}`
    }

    const addrSlice = (val) => {
        return `${val?.slice(0, 6)}...${val?.slice(val?.length - 4)}`
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    const handleEnterGameNotification = () => {
        dispatch({
            type: "success",
            message: "You will be redirected to the game!",
            title: "Payment Made!",
            position: "topR",
            icon: "stars",
        });
    };

    const handleUpdateNotification = () => {
        dispatch({
            type: "success",
            message: "Yippee, your score has been updated check the game!",
            title: "Score Updated!",
            position: "topR",
            icon: "stars",
        });
    };

    const handleNewNotificationError = (error) => {
        dispatch({
            type: "error",
            message: `Error: ${error.message.substring(0, 60)}... `,
            title: `Error: ${error.code} `,
            position: "topR",
            icon: "exclamation",
        });
    };

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            updateUIValues();
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterSuccess = async (tx) => {
        try {
            setIsMovingToGame(true)
            await tx.wait(1);
            setIsMovingToGame(false)
            updateUIValues();
            handleEnterGameNotification(tx);
            console.log(playerData.isPlaying);
            router.push('/game');

            
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateSuccess = async (tx) => {
        try {
            setIsMovingToGame(true)
            await tx.wait(1);
            setIsMovingToGame(false)
            updateUIValues();
            updateAccountValues();
            handleUpdateNotification(tx);
            console.log(playerScore);
            router.push('/');

            
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = async (error) => {
        console.log("error.code", error.code, "\nerror.data", error.data, "\nerror.message", error.message)
        handleNewNotificationError(error)
    };

    const enterGameProcess = async () => {
        return await enterGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        });
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (isWeb3Enabled) {
            updatePlayersValues();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (isWeb3Enabled) {
            updateAccountValues();
        }
    }, [isWeb3Enabled, account]);

    useEffect(() => {
        if (rounds && rounds > 0) {
            updatePrevValues()
        }
    }, [])

    useEffect(() => {

        
        router.events.on('routeChangeStart', () => setIsMovingToGame(true))

        router.events.on('routeChangeComplete', () => setIsMovingToGame(false));

        return () => {
            router.events.off('routeChangeStart', () => setIsMovingToGame(true))

            router.events.off('routeChangeComplete', () => setIsMovingToGame(false));
        };
    }, []);



    // Pass the Web3 functions and provider down through the context
    // const web3 = {
    //     updateUIValues,
    //     enterGameProcess,
    //     entranceFee,
    //     numberOfPlayers,
    //     prevFirstWinner,
    // };

    return (
        <Web3Context.Provider
            value={{
                entranceFee,
                numberOfPlayers,
                lastTimeStamp,
                gameAddress,
                abi,

                playerData,
                prevFirstWinner,
                prevSecondWinner,
                prevThirdWinner,
                prevLuckyWinner,
                first,
                second,
                third,
                enterGame,
                playerScore,
                setPlayerScore,
                timer, 
                setTimer,
                timeLeft,

                isLoading,
                isFetching,
                isMovingToGame,
                handleNewNotification,
                handleSuccess,
                handleEnterSuccess,
                handleUpdateSuccess,
                handleError,
                enterGameProcess,
                accountSlice,
                addrSlice,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export default Web3Context;