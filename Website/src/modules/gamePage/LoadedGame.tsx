import { GameStructure } from "murdle-control-plane-client";
import { useEffect, useReducer, useState } from "react";
import { AlertContainer } from "../wordleComponents/alerts/AlertContainer";
import {
  AlertProvider,
  useAlert,
} from "../wordleComponents/common/AlertContext";
import { CountDown } from "./CountDown";
import { GameComplete } from "./GameComplete";
import { GameIO } from "./GameIO";
import { GameRoundCompleted } from "./GameRoundCompleted";
import { calculateInitialState, gameStateReducer } from "./gameState";
import { GameWaiting } from "./GameWaiting";

export const LoadedGame: React.FC<{ game: GameStructure }> = ({ game }) => {
  const [gameState, gameStateDispatch] = useReducer(
    gameStateReducer,
    calculateInitialState(game)
  );
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [guesses, setGuesses] = useState<string[]>([]);

  function onValidGuess(currentGuess: string) {
    guesses.push(currentGuess);
    setGuesses(guesses);
    if (currentGuess == gameState.currentRound.wordleWord?.toUpperCase()!) {
      gameStateDispatch({
        game: game,
        type: "won",
      });
    } else if (guesses.length == 5) {
      gameStateDispatch({
        game: game,
        type: "lost",
      });
    }
  }

  useEffect(function () {
    setInterval(() => {
      gameStateDispatch({
        game: game,
        type: "recalculate",
      });
    }, 1000);
  }, []);

  if (gameState.gameStatus == "complete") {
    return <GameComplete game={game}></GameComplete>;
  }

  if (gameState.roundStatus == "lost") {
    return (
      <GameRoundCompleted
        startTime={gameState.currentRound.endTime}
        completionType={"lost"}
      ></GameRoundCompleted>
    );
  }

  if (gameState.roundStatus == "waiting") {
    return (
      <GameWaiting startTime={gameState.currentRound.startTime} lastRound={gameState.lastRound} playerScores={gameState.playerScores}></GameWaiting>
    );
  }

  if (gameState.roundStatus == "won") {
    return (
      <GameRoundCompleted
        startTime={gameState.currentRound.endTime}
        completionType={"won"}
      ></GameRoundCompleted>
    );
  }

  return (
    <AlertProvider>
      <div className="bg-slate-50 grid place-items-center h-screen">
        <div className="bg-white p-10 rounded-md drop-shadow">
          <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
            Murdle
          </h1>{" "}
          <h2 className="place-content-center text-center">
            Round: {gameState.currentRoundIndex + 1}
          </h2>
          <div className="place-content-center text-center">
            <div>
              Time Left{" "}
              <CountDown
                targetTime={gameState.currentRound.endTime}
              ></CountDown>
            </div>
          </div>
          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-600 font-medium">
              {" "}
              {errorMessage}{" "}
            </p>
          )}
          <GameIO
            solution={gameState.currentRound.wordleWord!.toUpperCase()}
            guesses={guesses}
            onValidGuess={onValidGuess}
          ></GameIO>
          <AlertContainer />
        </div>
      </div>
    </AlertProvider>
  );
};
