import React, { useState, useEffect } from 'react';

function Countdown({ duration }) {
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [duration]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <>
            {/* <span className="float-right pl-5">{formatTime(timeRemaining)}</span> */}
            <span className="float-right pl-5">Time left: {formatTime(duration)}</span>
        </>
    );
}


export default Countdown;
