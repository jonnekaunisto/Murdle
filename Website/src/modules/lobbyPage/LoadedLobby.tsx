import { LobbyStructure, PublicUser } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { useState } from "react";
import { LocalUser } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { QRCodeSVG } from "qrcode.react";
import { FormButton } from "../common/Buttons";

interface Player {
  playerId: string;
  playerName: string;
  owner: boolean;
  displayName: string;
}

function getPlayers(lobby: LobbyStructure, user: LocalUser): Player[] {
  return lobby.players.map((player) => {
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

export const LoadedLobby: React.FC<{lobby: LobbyStructure, localUser: LocalUser}> = ({lobby, localUser}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);

  const players = getPlayers(lobby, localUser);
  const lobbyJoinUrl = `murdle.jonnekaunisto.com/join/?lobbyId=${lobby.lobbyId}`;

  function startGame() {
    const murdleClient = createClient(localUser.authToken);
    murdleClient.startGame({
      lobbyId: lobby.lobbyId,
    }).then(result => {
      router.push(`/game/?gameId=${result.game.gameId}`);
    })
    .catch(error => {
      console.log(error);
      setErrorMessage("Unexpected error ocurred");
    });
  }

  function copyCode() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

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
        {localUser && lobby && localUser.userId == lobby.ownerUserId && (
          <FormButton message="Start Game" color="indigo" onClick={startGame}></FormButton>
        )}
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
          <input
            type="text"
            value={lobby.lobbyId}
            className="appearance-none rounded-none relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            readOnly
          />
          <CopyToClipboard
            text={lobbyJoinUrl}
            onCopy={copyCode}
          >
            <button className="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {copied ? "Copied" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
        <p className="pt-5 text-gray-500 text-center text-xl">
          Or Share the QR code:
        </p>
        <div style={{ background: "white", padding: "16px" }}>
          <div className="hero container max-w-screen-lg mx-auto pb-2 flex justify-center">
            <QRCodeSVG
              value={lobbyJoinUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
