import React, { useRef, useState } from 'react'
import { BeakerIcon } from '@heroicons/react/24/solid'
import useSound from "use-sound";
// import game from "../../assets/main.mp3";

export default function Start({ setUserName, userName }) {
    const volume = 0.1
    //error msg
    const [error, setError] = useState(false);
    //inputRef
    const inputRef = useRef()

    const [something, { stop }] = useSound("/assets/welcome.mp3", { volume });

    const handleClick = () => {
        //if the input is empty set error to true else, set the value to the username
        if (inputRef.current.value === "") {
            setError(true);
        } else {
            //stop the sound
            stop()
            // console.log("inputRef.current.value", inputRef.current.value);
            setUserName(inputRef.current.value);
        }

    }
    return (
        <div className='start' >

            <div className="content" >
                <div className="github">
                    <a href="https://github.com/bayurzx" target='_blank' rel='noreferrer'>
                        <BeakerIcon className="h-6 w-6 text-blue-500" />
                    </a>
                </div>
                <div className="wrapper">

                    <input type="text" placeholder='Enter Your Username' className='startInput' ref={inputRef} onFocus={() => something()} />
                    {
                        error && <p style={{color: "red", fontWeight: "50px", padding: "20px"}}>Enter username!</p>
                    }
                    <div className="btn">
                        <button className='startButton' onClick={handleClick}>Let's Start</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
