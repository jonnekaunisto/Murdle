import { LobbyStructure, PublicUser } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { Grid } from "../wordleComponents/grid/Grid";
import { Keyboard } from "../wordleComponents/keyboard/Keyboard";

export const GamePage: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [localUser, setLocalUser] = useState<LocalUser | undefined>();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  function onChar(char: string) {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${char}`);
    }
  }

  function onDelete() {
    setCurrentGuess(currentGuess.substring(0, currentGuess.length-1));
  }

  function onEnter() {
    if (currentGuess.length == 5) {
      guesses.push(currentGuess);
      setCurrentGuess('');
    }
  }

  useEffect(
    function () {
      if (!router.isReady) {
        return;
      }
      if (typeof router.query.lobbyId !== "string") {
        setErrorMessage("You cannot join an invalid Lobby.");
        return;
      }
      const parsedLobbyId = router.query.lobbyId as string;
      const localUserDAL = new LocalUserDAL();
      const user = localUserDAL.getUser();
      setLocalUser(user);
      if (user == undefined) {
        router.push(`/join/?lobbyId=${parsedLobbyId}`);
        return;
      }

      const murdleClient = createClient(user.authToken);
    },
    [router.isReady]
  );

  return (
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
          Murdle
        </h1>{" "}
        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-600 font-medium">
            {" "}
            {errorMessage}{" "}
          </p>
        )}
        <div className="pb-6 grow">
          <Grid
            solution={'brian'}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={false}
            currentRowClassName={"jiggle"}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={'brian'}
          guesses={guesses}
          isRevealing={false}
        />
      </div>
    </div>
  );
};
