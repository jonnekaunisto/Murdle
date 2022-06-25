import { GameStructure } from "murdle-control-plane-client";

export const Scores: React.FC<{ game: GameStructure }> = ({ game }) => {
  return (
    <div>
      <h2>Scores: </h2>
      {game.playerScores
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
