import React, { useContext } from "react";
import Web3Context from "../context/Web3Context";

import EnterGame from "./EnterGame";
import GameStat from "./GameStat";
import PlayerStat from "./PlayerStat";

import LoadingPage from "./LoadingPage";

const style = {
    background: '#0092ff',
    padding: '8px 0',
    maxWidth: "80px"
};


const Lobby = () => {
    const {

        isMovingToGame,

    } = useContext(Web3Context);


    return (
        <div>
            <section id="lobby" aria-labelledby="pricing-title" className="border-top border-gray-200 bg-gray-100 py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 id="pricing-title" className="text-3xl font-medium tracking-tight text-gray-900">Game On</h2>
                        <p className="mt-2 text-lg text-gray-600">Are you ready to make the online world safer while having a blast? Let the game begin</p>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-2">


                        {/* Enter game section */}
                        <EnterGame />



                        <section className="flex flex-col "> {/* VIP section */}

                            {/* GameStat */}
                            <GameStat />


                            {/* PlayerStat */}
                            <PlayerStat />
                            {/* <LoadingStat /> */}
                            {isMovingToGame && <LoadingPage />}
                        </section>
                    </div>
                </div>
            </section>





            <hr />
        </div>

    )
}

export default Lobby;