import { LobbyStructure } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { Loading } from "../common/Loading";
import { LoadedLobby } from "./LoadedLobby";

export const LobbyPage: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [lobby, setLobby] = useState<LobbyStructure | undefined>();
  const [localUser, setLocalUser] = useState<LocalUser | undefined>();

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

      murdleClient
        .joinLobby(parsedLobbyId)
        .then((result) => {
          setLobby(result.lobby);
        })
        .catch((error) => {
          setErrorMessage("Encountered an unexpected error");
          console.log(error);
        });
    },
    [router.isReady]
  );

  if (lobby == undefined || localUser == undefined) {
    return <Loading errorMessage={errorMessage}></Loading>
  }

  return <LoadedLobby lobby={lobby} localUser={localUser}></LoadedLobby>;
};
