import { useState } from "react";
import { isWordleWord } from "../wordleComponents/common/wordle";
import { Grid } from "../wordleComponents/grid/Grid";
import { Keyboard } from "../wordleComponents/keyboard/Keyboard";

export const GameIO: React.FC<{
  solution: string;
  guesses: string[];
  onValidGuess: (wordleWord: string) => void;
}> = ({ solution, guesses, onValidGuess }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  function onChar(char: string) {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${char}`);
    }
  }

  function onDelete() {
    setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
  }

  async function onEnter() {
    if (currentGuess.length == 5 && isWordleWord(currentGuess)) {
      await onValidGuess(currentGuess);
      setCurrentGuess("");
      setIsRevealing(true);

      // turn this back off after all
      // chars have been revealed
      setTimeout(() => {
        setIsRevealing(false);
      // TODO: Set in constant
      }, 350 * 5);
    } else {
      setCurrentRowClass("jiggle");

      return setTimeout(() => {
        setCurrentRowClass("");
      }, 2000);
    }
  }

  return (
    <div>
      <div className="pb-6 grow">
        <Grid
          solution={solution}
          guesses={guesses}
          currentGuess={currentGuess}
          isRevealing={isRevealing}
          currentRowClassName={currentRowClass}
        />
      </div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        solution={solution}
        guesses={guesses}
        isRevealing={isRevealing}
      />
    </div>
  );
};
