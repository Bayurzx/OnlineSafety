import React, { useContext } from "react";
import Web3Context from "../context/Web3Context";


const PlayerStat = () => {
    const {

        accountSlice,
        playerData,
    } = useContext(Web3Context);


    return (
        <>
            <div className="overflow-hidden rounded-3xl p-6 mt-4 shadow-lg shadow-gray-900/5 bg-black text-white">

                <h3 className="flex items-center text-sm font-semibold">
                    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-6 w-6 flex-none fill-cyan-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 2c-7.264 0-13.321 5.163-14.704 12.02C4.97 14.358 6.343 13 8 13h2v7H8c-2.757 0-5 2.243-5 5s2.243 5 5 5h2v1h2v-1h2v1h2v-1h2v1h2v-1h2v1h2v-1h2v-1h2v-1h2c2.757 0 5-2.243 5-5s-2.243-5-5-5h-2v-7h2c1.657 0 3.03 1.358 3.706 3.02C34.279 7.165 27.264 2 20 2zm0 4c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z" />
                    </svg>
                    <span className="ml-4" style={{ color: "greenyellow" }}>Your Stats</span>
                </h3>
                <p className="relative mt-5 flex text-3xl tracking-tight">{accountSlice()}</p>
                <p className="mt-3 text-sm text-gray-300">Check your stats!</p>
                <div className="flex justify-center">
                    <div className="pt-2 pb-2" style={{ flex: 1 }}>
                        <h2 className="mb-2 mt-2">Score</h2>
                        <p className="mb-2 mt-2">{playerData?.score}</p>
                    </div>
                    <div className="pt-2 pb-2" style={{ flex: 1 }}>
                        <h2 className="mb-2 mt-2">Winnings</h2>
                        <p className="mb-2 mt-2">{playerData?.winnings}</p>
                    </div>
                    <div className="pt-2 pb-2" style={{ flex: 1 }}>
                        <h2 className="mb-2 mt-2">Has Played</h2>
                        <p className="mb-2 mt-2">{playerData?.hasPlayed}</p>
                    </div>
                    <div className="pt-2 pb-2" style={{ flex: 1 }}>
                        <h2 className="mb-2 mt-2">Is Playing?</h2>
                        <p className="mb-2 mt-2">{playerData?.isPlaying ? ("Yes...🚀") : ("Noo...😭")}</p>
                    </div>
                </div>

            </div>

        </>

    )
}

export default PlayerStat;