import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import Web3Context from "../../context/Web3Context";
import LoadingPage from "../LoadingPage";
import { UpdateButton } from "./UpdateButton";




export const Earned = ({ earned, setEarned, userName, setStop, setQuestionNumber }) => {



    const {
        isMovingToGame,
        timer,

    } = useContext(Web3Context);



    //formatting amount
    const convert = (num) => {
        num = num * timer
        const localeString = new Intl.NumberFormat("en-US").format(num);

        return localeString;
    };

    // function that updates scores collected from props
    // we don't need to pass setUserName, earned, setEarned

    const handleClick = async () => {

        setEarned("0")

        setStop(false)

        setQuestionNumber(1)

    }

    return (

        <>
            {
                earned < 8000 ?
                    <div className='earnedContent'>
                        <div className="content">
                            <h3 className="endText">Your Total Points: {convert(earned)}</h3>
                            <button onClick={handleClick} className='tryAgain'>Try Again</button>
                        </div>
                    </div>

                    :
                    // when you win
                    <div className='earnedContent congrats'>
                        <div className="content">
                            <h1 className='endText'>Congratulations {userName}</h1>
                            <h3 className="endText">Your Total Points: {convert(earned)}</h3>
                            <UpdateButton playerScore = {(earned * timer)} /> 

                        </div>
                    </div>
            }
            {isMovingToGame && <LoadingPage />}

        </>

    )
}
