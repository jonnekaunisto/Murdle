import { PlayerScore, Round } from "murdle-control-plane-client";
import { useEffect, useState } from "react";
import { Scores } from "./Scores";

function calculateTimeLeft(startTime: number): number {
  const currentTime = Date.now();

  return Math.round((startTime - currentTime) / 1000);
}

export const GameWaiting: React.FC<{ startTime: number, lastRound?: Round, playerScores: PlayerScore[] }> = ({ startTime, lastRound, playerScores }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startTime));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(startTime));
    }, 1000);
  });
  return (
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
          Murdle
        </h1>
        <Scores playerScores={playerScores}></Scores>
        {lastRound &&
          <p className="place-content-center text-center">The word was {lastRound.wordleWord?.toUpperCase()}</p>
        }
        <div>
          <p>The round will start in {timeLeft} seconds</p>
        </div>
      </div>
    </div>
  );
};
