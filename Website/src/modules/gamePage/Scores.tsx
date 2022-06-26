import { PlayerScore } from "murdle-control-plane-client";

export const Scores: React.FC<{ playerScores: PlayerScore[] }> = ({ playerScores }) => {
  return (
    <div>
      <h2>Scores: </h2>
      {playerScores
        .sort((scoreA, scoreB) => scoreA.score - scoreB.score)
        .map((score) => {
          return (
            <p key={score.player.userId}>
              {score.player.userName}: {score.score}
            </p>
          );
        })}
    </div>
  );
};
