import { Grid } from "react-loader-spinner";

export const Loading: React.FC<{ errorMessage?: string }> = ({
  errorMessage,
}) => {
  return (
    <div className="bg-slate-50 grid place-items-center h-screen">
      <div className="bg-white p-10 rounded-md drop-shadow">
        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-600 font-medium">
            {" "}
            {errorMessage}{" "}
          </p>
        )}
        <h1 className="place-content-center text-center text-4xl tracking-tight font-extrabold text-5xl block text-indigo-600">
          Murdle
        </h1>
        <div className="hero container max-w-screen-lg mx-auto pb-2 flex justify-center pt-4">
          <Grid color="#6366f1" ariaLabel="loading-indicator" />
        </div>
      </div>
    </div>
  );
};
