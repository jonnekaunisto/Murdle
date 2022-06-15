import { DefaultApi } from "murdle-control-plane-client";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { LocalUser, LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";

export const LandingPage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [joinLobbyId, setJoinLobbyId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  function upsertUser(
    murdleClient: DefaultApi,
    localUserDAL: LocalUserDAL,
    user: LocalUser | undefined
  ): Promise<void> {
    // Update User if the username changed
    if (user && user.userName != userName) {
      return murdleClient
        .updateUser(user.userId, {
          userName,
        })
        .then((result) => {
          localUserDAL.updateUser(userName);
        });
    }

    if (!user) {
      return murdleClient
        .createUser({
          userName,
        })
        .then((result) => {
          const user = result.user;
          localUserDAL.createUser({
            userName,
            userId: user.userId,
            authToken: user.userToken,
          });
        })
        .catch((error) => {
          setErrorMessage("Encountered an unexpected error");
          console.log(error);
        });
    }
    return Promise.resolve(undefined);
  }

  async function createLobby(event: SyntheticEvent) {
    event.preventDefault();
    const localUserDAL = new LocalUserDAL();
    const user = localUserDAL.getUser();
    const murdleClient = createClient(user?.authToken);

    upsertUser(murdleClient, localUserDAL, user)
      .then(() => {
        murdleClient
          .createLobby()
          .then((result) => {
            router.push(`/lobby/?lobbyId=${result.lobby.lobbyId}`);
          })
          .catch((error) => {
            setErrorMessage("Encountered an unexpected error");
            console.log(error);
          });
      })
      .catch((error) => {
        setErrorMessage("Encountered an unexpected error");
        console.log(error);
      });
  }

  async function joinLobby(event: SyntheticEvent) {
    event.preventDefault();
    router.push(`/join/?lobbyId=${joinLobbyId}`);
  }

  useEffect(function () {
    const localUserDAL = new LocalUserDAL();
    const user = localUserDAL.getUser();
    if (user?.userName) {
      setUserName(user?.userName);
    }
  }, []);

  return (
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">Murdle</h1>
        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-600 font-medium">
            {" "}
            {errorMessage}{" "}
          </p>
        )}
        <form onSubmit={createLobby} className="my-5">
          <label>
            <input
              type="text"
              name="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Choose UserName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Create Lobby"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </form>
        <form onSubmit={joinLobby} className="my-5">
          <label>
            <input
              type="text"
              name="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="ex. noisy.bobby.foamy"
              value={joinLobbyId}
              onChange={(event) => setJoinLobbyId(event.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Join Lobby"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </form>
      </div>
    </div>
  );
};
