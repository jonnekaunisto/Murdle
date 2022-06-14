import { LobbyStructure, PublicUser } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    displayName = "👑 " + displayName;
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
  const [copied, setCopied] = useState(false);

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
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        {" "}
        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-600 font-medium">
            {" "}
            {errorMessage}{" "}
          </p>
        )}
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
          Murdle
        </h1>
        <p className="pt-5 text-gray-600 text-center text-2xl">
          Waiting for Players ({players.length}/8)
        </p>
        <ul>
          {players.map((player) => (
            <li
              key={player.playerId}
              className="text-gray-500 text-center text-xl"
            >
              {player.displayName}
            </li>
          ))}
        </ul>
        <p className="pt-5 text-gray-500 text-center text-xl">
          Share Code or Link with Friends:
        </p>
        <div>
          <input type="text" value={`${lobbyId}`} className="appearance-none rounded-none relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" readOnly />
          <CopyToClipboard text={`murdle.jonnekaunisto.com/join?lobbyId=${lobbyId}`} onCopy={() => setCopied(true)}>
            <button className="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{copied ? 'Copied' : 'Copy'}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
