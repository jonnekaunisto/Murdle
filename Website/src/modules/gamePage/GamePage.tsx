import { GameStructure } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { Loading } from "../common/Loading";
import { LoadedGame } from "./LoadedGame";

export const GamePage: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [game, setGame] = useState<GameStructure | undefined>(undefined);

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
      if (user == undefined) {
        router.push("/");
        return;
      }

      const murdleClient = createClient(user.authToken);

      murdleClient
        .describeGame(parsedGameId)
        .then((result) => {
          setGame(result.game);
        })
        .catch((error) => {
          setErrorMessage("Ran into unexpected error");
        });
    },
    [router.isReady]
  );

  if (game == undefined) {
    return <Loading errorMessage={errorMessage}></Loading>;
  }

  return <LoadedGame game={game}></LoadedGame>
};
