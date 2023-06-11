import React, { useContext, useEffect } from "react";
import Web3Context from "../../context/Web3Context";


export default function Timer({ setStop, questionNumber }) {
    const {
        timer,
        setTimer,
    } = useContext(Web3Context);


    useEffect(() => {
        // if the timer elapses, stop the quiz 
        if (timer === 0) return setStop(true);
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [setStop, timer]);

    // useEffect(() => {
    //     // if the question number changes, the timer will be set to 600 
    //     setTimer(600)
    // }, [questionNumber])

    return timer;
}
