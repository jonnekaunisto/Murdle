import { GameStructure } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { AlertContainer } from "../wordleComponents/alerts/AlertContainer";
import {
  AlertProvider,
  useAlert,
} from "../wordleComponents/common/AlertContext";
import { isWordleWord } from "../wordleComponents/common/wordle";
import { Grid } from "../wordleComponents/grid/Grid";
import { Keyboard } from "../wordleComponents/keyboard/Keyboard";
import { GameComplete } from "./GameComplete";
import { GameState } from "./gameState";
import { GameWaiting } from "./GameWaiting";

export const GamePage: React.FC = () => {
  const router = useRouter();
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [localUser, setLocalUser] = useState<LocalUser | undefined>();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [game, setGame] = useState<GameStructure | undefined>(undefined);
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);

  function onChar(char: string) {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${char}`);
    }
  }

  function onDelete() {
    setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
  }

  function onEnter() {
    if (gameState == undefined) {
      return;
    }
    if (currentGuess.length == 5 && isWordleWord(currentGuess)) {
      if (currentGuess == gameState.currentRound.wordleWord!) {
        gameState?.won();
      }
      guesses.push(currentGuess);
      setGuesses(guesses);
      setCurrentGuess("");
      setIsRevealing(true);
      // turn this back off after all
      // chars have been revealed
      setTimeout(() => {
        setIsRevealing(false);
      }, 2000 * 5);
    } else {
      setCurrentRowClass("jiggle");
      showErrorAlert("Word is not valid");

      return setTimeout(() => {
        setCurrentRowClass("");
      }, 2000);
    }
  }

  useEffect(
    function () {
      if (!router.isReady) {
        return;
      }
      if (typeof router.query.gameId !== "string") {
        setErrorMessage("You cannot join an invalid Game.");
        return;
      }
      const parsedGameId = router.query.gameId;
      const localUserDAL = new LocalUserDAL();
      const user = localUserDAL.getUser();
      setLocalUser(user);
      if (user == undefined) {
        router.push("/");
        return;
      }

      const murdleClient = createClient(user.authToken);

      murdleClient
        .describeGame(parsedGameId)
        .then((result) => {
          console.log()
          setGame(result.game);
          setSolution(result.game.rounds[0].wordleWord?.toUpperCase());
          setGameState(new GameState(result.game));
        })
        .catch((error) => {
          setErrorMessage("Ran into unexpected error");
        });
    },
    [router.isReady]
  );

  useEffect(
    function () {
      if (game == undefined || gameState == undefined) {
        return;
      }

      setInterval(() => {
        console.log('here');
        console.log(game);
        console.log(gameState);
        if (game != undefined && gameState != undefined) {
          gameState.recalculate(game);
          setGameState(Object.assign({}, gameState));
          console.log("recalculated");
          console.log(gameState);
        }
      }, 1000);
    },
    [game != undefined && gameState != undefined]
  );

  console.log('Rerender')
  if (game == undefined || solution == undefined || gameState == undefined) {
    return <p>Loading...</p>;
  }

  if (gameState.gameStatus == "complete") {
    return <GameComplete lobbyId={game.lobbyId}></GameComplete>;
  }

  if (gameState.roundStatus == "lost") {
    return <p>Lost...</p>;
  }

  if (gameState.roundStatus == "waiting") {
    return (
      <GameWaiting startTime={gameState.currentRound.startTime}></GameWaiting>
    );
  }

  if (gameState.roundStatus == "won") {
    return <p>Won...</p>;
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
          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-600 font-medium">
              {" "}
              {errorMessage}{" "}
            </p>
          )}
          <div className="pb-6 grow">
            <Grid
              solution={gameState.currentRound.wordleWord!}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={gameState.currentRound.wordleWord!}
            guesses={guesses}
            isRevealing={isRevealing}
          />
          <AlertContainer />
        </div>
      </div>
    </AlertProvider>
  );
};
