import { SyntheticEvent, useEffect, useState } from "react";
import { LocalUserDAL } from "../../util/localUserDAL";
import { createClient } from "../../util/murdleClient";

export const LandingPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const localUserDAL = new LocalUserDAL();
    const user = localUserDAL.getUser();
    const murdleClient = createClient(user?.authToken);

    if (user && user.userName != userName) {
      murdleClient
        .updateUser(user.userId, {
          userName,
        })
        .then((result) => {
          localUserDAL.updateUser(userName);
        })
        .catch((error) => {
          setErrorMessage("Encountered an unexpected error");
          console.log(error);
        });
    }

    if (!user) {
      murdleClient
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
  }

  useEffect(function () {
    const localUserDAL = new LocalUserDAL();
    const user = localUserDAL.getUser();
    if (user?.userName) {
      setUserName(user?.userName);
    }
  }, []);

  return (
    <div className="bg-slate-50 max-w-md w-full space-y-8 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {errorMessage && (
        <p className="mt-2 text-center text-sm text-red-600 font-medium">
          {" "}
          {errorMessage}{" "}
        </p>
      )}
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            placeholder="Choose a Name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
        <input type="submit" value="Create a Lobby" />
      </form>
    </div>
  );
};
