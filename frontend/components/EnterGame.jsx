import React, { useContext } from "react";
import Web3Context from "../context/Web3Context";

const style = {
  background: "#0092ff",
  padding: "8px 0",
  maxWidth: "80px",
};

const EnterGame = () => {
  const {
    isLoading,
    isFetching,
    enterGame,
    handleEnterSuccess,
    handleError,
  } = useContext(Web3Context);

  const startGame = async () => {
    const enterLog = await enterGame({
      // onComplete:
      onSuccess: handleEnterSuccess,
      onError: (error) => handleError(error),
    });
    // console.log("enterLog", enterLog);
  };

  return (
    <>
      <section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 bg-white">
        {" "}
        {/* EnterGame section */}
        <div className="flex flex-row">
          <div className="mr-4">
            <img
              src="/pic.jpg"
              alt="Starter Image"
              className={style.maxWidth}
            />
          </div>
          <div>
            <p className="mt-3 text-4xl mb-5 text-gray-700">Digital Safety</p>
            <h1 className="font-semibold text-gray-900">Game Features</h1>
            <p className="mt-3 text-sm text-gray-700">
              Interactive Gameplay: Engage in immersive quizzes that simulate
              real-life online scenarios.
            </p>
            <p className="mt-3 text-sm text-gray-700">
              Educational Content: Gain valuable insights and practical tips
              from experts in cybersecurity.
            </p>
            <p className="mt-3 text-sm text-gray-700">
              Competitive Leaderboards: Compete with friends and players
              worldwide to claim the top spot.
            </p>
            {/* <p className="text-3xl tracking-tight text-gray-900 mt-5"></p> */}
            <button
              onClick={() => startGame()}
              disabled={isLoading || isFetching}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              {isLoading || isFetching ? (
                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
              ) : (
                "0.005 eth"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterGame;
