import { useEffect, useState } from "react";

function calculateTimeLeft(startTime: number): number {
  const currentTime = Date.now();

  return Math.round((startTime - currentTime) / 1000);
}

export const CountDown: React.FC<{ targetTime: number }> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);
  });
  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};
