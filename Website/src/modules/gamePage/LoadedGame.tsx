import { DefaultApi, GameStructure } from "murdle-control-plane-client";
import { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { AlertContainer } from "../wordleComponents/alerts/AlertContainer";
import {
  AlertProvider,
  useAlert,
} from "../wordleComponents/common/AlertContext";
import { CountDown } from "./CountDown";
import { GameComplete } from "./GameComplete";
import { GameIO } from "./GameIO";
import { GameRoundCompleted } from "./GameRoundCompleted";
import { recalculate, gameStateReducer } from "./gameState";
import { GameWaiting } from "./GameWaiting";

export const LoadedGame: React.FC<{ initialGame: GameStructure, murdleClient: DefaultApi }> = ({ initialGame, murdleClient }) => {
  const [game, setGame] = useState(initialGame);
  const [gameState, gameStateDispatch] = useReducer(
    gameStateReducer,
    recalculate(game)
  );
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();


  async function onValidGuess(currentGuess: string): Promise<undefined> {
    // TODO: Handle 4xx error
    // Example: When we guessed too many times already
    const guessResult = await murdleClient.submitGameGuess(game.gameId, {
      guess: currentGuess,
      roundNumber: gameState.currentRoundIndex + 1,
    });

    if (guessResult.game == undefined) {
     throw new Error("Game undefined");
    }
    setGame(guessResult.game);

    gameStateDispatch({
      game: guessResult.game,
      type: "recalculate",
    });

    return undefined;
  }

  useEffect(function () {
    const intervalId = setInterval(() => {
      gameStateDispatch({
        game,
        type: "recalculate",
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [game]);

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
            guesses={gameState.currentRoundGuesses}
            onValidGuess={onValidGuess}
          ></GameIO>
          <AlertContainer />
        </div>
      </div>
    </AlertProvider>
  );
};
