import { GameStructure } from "murdle-control-plane-client";
import { useEffect, useState } from "react";

export type GameRoundCompletionType = "won" | "lost";

function calculateTimeLeft(startTime: number): number {
  const currentTime = Date.now();

  return Math.round((startTime - currentTime) / 1000);
}

export const GameRoundCompleted: React.FC<{
  startTime: number;
  completionType: GameRoundCompletionType;
}> = ({ startTime, completionType }) => {
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
        <p className="place-content-center text-center ">You {completionType} this round!</p>
        <div>
          <p>The next round will start in {timeLeft} seconds</p>
        </div>
      </div>
    </div>
  );
};
