import React, { useEffect, useState } from 'react'
import { ListOfQuestions } from '../../data/localDb';

import useSound from "use-sound";
import GameChat from './GameChat';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';


export default function GameQuiz({ setStop, setQuestionNumber, questionNumber }) {
    // state for a single question 
    const [question, setQuestion] = useState(null);
    //state for the selected answer
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    //state for the class names that cause animation on the selected option
    const [className, setClassName] = useState("answer")

    const [isChat, setIsChat] = useState(false);

    //sound for correct answer
    const [soundPlaying] = useSound("/sounds/sounds_play.mp3");
    //sound for wrong answer
    const [soundsRightPlay] = useSound("/sounds/sounds_correct.mp3");
    //initial sound for the start of the quiz
    const [soundsWrongPlay] = useSound("/sounds/sounds_wrong.mp3");

    useEffect(() => {
        // play the sound on componentDidMount 
        soundPlaying()
    }, [soundPlaying]);


    useEffect(() => {
        // setting the question from the list of questions
        setQuestion(ListOfQuestions[questionNumber - 1])
    }, [questionNumber])

    //Custom function for timeout with duration and a callback function as parameters
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration)
    }

    const handleClick = (a) => {
        setSelectedAnswer(a)
        setClassName("answer active")
        delay(3000, () => setClassName(a.correct ? "answer correct" : "answer wrong"))
        delay(5000, () => {
            if (a.correct) {
                // where I will write the code for preview
                soundsRightPlay()
                delay(1000, () => {
                    if (ListOfQuestions.length !== questionNumber) {
                        setQuestionNumber(prev => prev + 1);
                        setSelectedAnswer(null);
                    } else {
                        setStop(true);
                        setQuestionNumber(1)
                        setSelectedAnswer(null);
                    }

                })

            } else {
                soundsWrongPlay();
                delay(1000, () => {
                    setStop(true);
                })

            }

        })
    }
    return (
        <div className='GameQuiz'>
            <button className='floatObject' onClick={() => setIsChat(true)}><ChevronDoubleDownIcon />Hint?</button>
            <GameChat isChat={isChat} setIsChat={setIsChat} questionNumber={questionNumber-1} />
            <div className="question">{question?.question}</div>
            <div className="answers">
                {
                    question?.answers.map((a, index) => (
                        <div id={index} key={index} className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
                    ))
                }
            </div>
        </div>
    )
}
