import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import { FormButton } from "../common/Buttons";

export const GameComplete: React.FC<{ lobbyId: string }> = ({ lobbyId }) => {
  const router = useRouter();

  function returnToLobby(event: SyntheticEvent) {
    event.preventDefault();
    router.push(`/lobby/?lobbyId=${lobbyId}`);
  }

  return (
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
          Murdle
        </h1>
        <p>Scores: TODO</p>
        <FormButton message={"Return to Lobby"} color={"red"} onClick={returnToLobby}></FormButton>
      </div>
    </div>
  );
};
