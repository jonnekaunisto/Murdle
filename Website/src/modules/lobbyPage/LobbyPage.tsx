import { LobbyStructure, PublicUser } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";

interface Player {
  playerId: string;
  playerName: string;
  owner: boolean;
  displayName: string;
}

function getPlayers(lobby: LobbyStructure, user: LocalUser): Player[] {
  return lobby.players.map((player) => {
    console.log(player);
    return {
      playerId: player.userId,
      playerName: player.userName,
      owner: player.userId == lobby.ownerUserId,
      displayName: getDisplayName(player, lobby, user),
    };
  });
}

function getDisplayName(
  player: PublicUser,
  lobby: LobbyStructure,
  user: LocalUser
) {
  var displayName = player.userName;
  if (player.userId == lobby.ownerUserId) {
    displayName += " (host)";
  }
  if (player.userId == user.userId) {
    displayName += " (you)";
  }
  return displayName;
}

export const LobbyPage: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [lobbyId, setLobbyId] = useState("");

  useEffect(
    function () {
      if (!router.isReady) {
        return;
      }
      // TODO: Add better validation
      const parsedLobbyId = router.query.lobbyId as string;
      setLobbyId(parsedLobbyId);
      const localUserDAL = new LocalUserDAL();
      const user = localUserDAL.getUser();
      if (user == undefined) {
        router.push(`/join?lobbyId=${parsedLobbyId}`);
        return;
      }

      const murdleClient = createClient(user.authToken);

      murdleClient
        .joinLobby(parsedLobbyId)
        .then((result) => {
          setPlayers(getPlayers(result.lobby, user!));
        })
        .catch((error) => {
          setErrorMessage("Encountered an unexpected error");
          console.log(error);
        });
    },
    [router.isReady]
  );

  return (
    <div className="bg-slate-50 max-w-md w-full space-y-8 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {errorMessage && (
        <p className="mt-2 text-center text-sm text-red-600 font-medium">
          {" "}
          {errorMessage}{" "}
        </p>
      )}
      <h1>URL: murdle.jonnekaunisto.com/join?lobbyId={lobbyId}</h1>
      <ul>
        {players.map((player) => (
          <li key={player.playerId}>{player.displayName}</li>
        ))}
      </ul>
    </div>
  );
};
