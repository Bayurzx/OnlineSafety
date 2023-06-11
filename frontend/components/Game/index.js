import React, { useEffect, useMemo, useState } from "react";
import GameQuiz from "./GameQuiz";
import Timer from "./Timer";
import Start from "./Start";
import { Earned } from "./Earned";
import { ListOfQuestions } from '../../data/localDb';
import { PointsDb } from "../../data/PointsDb";



function Game() {
    //username 
    const [userName, setUserName] = useState("")
    //Question - setting the current question number
    const [questionNumber, setQuestionNumber] = useState(1);
    //state for setting stop for the game
    const [stop, setStop] = useState(false)
    //state for seeting points earned
    const [earned, setEarned] = useState("0")

    //state for setting timer
    // const [timer, setTimer] = useState(600);



    //using useMemo hook to hold the money pyraid data
    const PointsDbData = useMemo(() => PointsDb, []);

    useEffect(() => {
        //If the length of the list of questions is not equal to questionNumber, set the Earned points to the points that matches the questionNumber - 1 and id of the moneypyraid data. Else If the length of the list of questions is not equal, set the Earned points to the points that matches the questionNumber and id of the moneypyraid data
        if (ListOfQuestions.length !== questionNumber) {
            questionNumber > 1 && setEarned(PointsDb.find((m) => m.id === questionNumber - 1).points)
        } else {
            questionNumber > 1 && setEarned(PointsDb.find((m) => m.id === questionNumber).points)
        }

    }, [questionNumber])

    //formatting points
    const convert = (num) => {
        const localeString = new Intl.NumberFormat("en-US").format(num);
        return localeString;
    };

    return <div className="app">
        {
            userName ? (
                <>
                    <div className="main">
                        {/* The plave you will switch to chat */}
                        <>
                            {
                                stop ? <Earned earned={earned} setUserName={setUserName} userName={userName} setStop={setStop} setQuestionNumber={setQuestionNumber} setEarned={setEarned} />
                                    :
                                    (<>
                                        <div className="top">
                                            <div className="timer">
                                                <Timer setStop={setStop} questionNumber={questionNumber} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <GameQuiz setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} />
                                        </div>

                                    </>)
                            }
                        </>

                    </div>
                    <div className="pyramid">
                        <ul className="moneyList">
                            {
                                PointsDbData.map((money) => (
                                    <li key={money.id} className={questionNumber === money.id ? "moneyListItem active" : "moneyListItem"}>
                                        <span className="moneyListItemNumber">{money.id}</span>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </>
            ) : <Start setUserName={setUserName} userName={userName} />
        }


    </div>;
}

export default Game;
