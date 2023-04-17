/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext } from "preact/hooks";
import { tw } from "@twind";
import { getEven, getPrime } from "../routes/index.tsx";
import { NumberSpace } from "../routes/index.tsx";
import Wordle from "./Wordle.tsx";
import Keyboard from "./Keyboard.tsx";
import Hints from "./Hints.tsx";

type StateUpdater<S> = (value: S | ((prevState: S) => S)) => void;

export type KeyHandler = (key?: string) => void;

interface MainGameProps {
  CONFIG: {
    MAX_TRIES: number;
    NUMBER_LENGTH: number;
  };
}

export class ActualGuessPair {
  first: number;
  second: number;
  MAX_TRIES: number;
  NUMBER_LENGTH: number;

  constructor(
    first: number,
    second: number,
    MAX_TRIES: number,
    NUMBER_LENGTH: number
  ) {
    (this.first = first),
      (this.second = second),
      (this.MAX_TRIES = MAX_TRIES),
      (this.NUMBER_LENGTH = NUMBER_LENGTH);
  }

  addFirst(setter: StateUpdater<ActualGuessPair>) {
    this.first < this.MAX_TRIES - 1 &&
      setter(
        new ActualGuessPair(
          this.first + 1,
          0,
          this.MAX_TRIES,
          this.NUMBER_LENGTH
        )
      );
  }

  addSecond(setter: StateUpdater<ActualGuessPair>) {
    setter(
      new ActualGuessPair(
        this.first,
        this.NUMBER_LENGTH - 1 > this.second ? this.second + 1 : this.second,
        this.MAX_TRIES,
        this.NUMBER_LENGTH
      )
    );
  }

  minusSecond(setter: StateUpdater<ActualGuessPair>) {
    setter(
      new ActualGuessPair(
        this.first,
        this.second > 0 ? this.second - 1 : this.second,
        this.MAX_TRIES,
        this.NUMBER_LENGTH
      )
    );
  }
}

export default function MainGame({ CONFIG }: MainGameProps) {
  const { MAX_TRIES, NUMBER_LENGTH } = CONFIG;

  const [numberState, setNumberState] = useState(0);
  const [finishedGame, setFinishedGame] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState(
    Array(MAX_TRIES)
      .fill("")
      .map((_) =>
        Array(NUMBER_LENGTH)
          .fill("")
          .map((_) => new NumberSpace())
      )
  );
  const [actualGuess, setActualGuess] = useState(
    new ActualGuessPair(0, 0, MAX_TRIES, NUMBER_LENGTH)
  );

  useEffect(() => {
    const fetchDailyRandom = async () => {
      const response = await fetch(
        "https://daily-random.vercel.app/getGlobalNumber"
      );
      const data = await response.json();
      const globalNumber = String(data.globalRandom).slice(0, NUMBER_LENGTH);
      setNumberState(Number(globalNumber));
    };

    fetchDailyRandom();
  }, []);

  const delChar: KeyHandler = () => {
    if (finishedGame) throw new Error("Game finished");
    const newGuess = previousGuesses.slice();
    if (!previousGuesses[actualGuess.first][actualGuess.second].value) {
      newGuess[actualGuess.first][actualGuess.second - 1].value = "";
      actualGuess.minusSecond(setActualGuess);
    } else newGuess[actualGuess.first][actualGuess.second].value = "";

    setPreviousGuesses(newGuess);
  };

  const addChar: KeyHandler = (key) => {
    if (finishedGame) throw new Error("Game finished");
    if (!key) throw new Error("No key provided");
    if (!previousGuesses[actualGuess.first][actualGuess.second].value) {
      const newGuess = previousGuesses.slice();
      newGuess[actualGuess.first][actualGuess.second].value = key;
      setPreviousGuesses(newGuess);
      actualGuess.addSecond(setActualGuess);
      return;
    }

    throw new Error("Full length!");
  };

  const restartGame = () => {
    setActualGuess(new ActualGuessPair(0, 0, MAX_TRIES, NUMBER_LENGTH));
    setPreviousGuesses(
      Array(MAX_TRIES)
        .fill("")
        .map((_) =>
          Array(NUMBER_LENGTH)
            .fill("")
            .map((_) => new NumberSpace())
        )
    );
    setFinishedGame(false);
  };

  const setColorNumbers: (guess: NumberSpace[]) => void = (guess) => {
    const objective = String(numberState);
    const newGuess = guess.map((num, i) => {
      if (num.value === objective[i]) return num.ChangeColor("green");
      if (objective.includes(num.value)) return num.ChangeColor("yellow");
      return num.ChangeColor("red");
    });

    const newGuesses = previousGuesses.slice();
    newGuesses[actualGuess.first] = newGuess;
    setPreviousGuesses(newGuesses);
  };

  const checkFeatures = (n: number): boolean => {
    let lastNumber = Number();
    previousGuesses[actualGuess.first]
      .map((e) => Number(e.value))
      .reverse()
      .forEach((e, i) => (lastNumber += e * Math.pow(10, i)));

    return (
      getEven(lastNumber) == getEven(numberState) ||
      getPrime(lastNumber) == getPrime(numberState)
    );
  };

  const checkWin: () => boolean = () => {
    return (
      String(previousGuesses[actualGuess.first].map((e) => e.value)) ==
      String(String(numberState).split(""))
    );
  };

  const checkFullBoard: () => boolean = () => {
    return previousGuesses.every((el) => el.every((e) => e.value));
  };

  const checkLength: (n: number) => boolean = (n) => {
    let sum = 0;
    previousGuesses[actualGuess.first].forEach((el) => {
      if (el.value) sum++;
    });

    return sum === n;
  };

  const handleFinishedGame = (winned: boolean) => {
    if (winned) {
      alert("You win!");
    } else alert("You lose!");

    setFinishedGame(true);
  };

  const checkRow: KeyHandler = () => {
    if (finishedGame) return restartGame();
    if (!checkFeatures(numberState) || !checkLength(NUMBER_LENGTH)) {
      return alert(
        "The number must meet one of the two characteristics and have 4 digits"
      );
    }

    setColorNumbers(previousGuesses[actualGuess.first]);
    actualGuess.addFirst(setActualGuess);

    const winState = checkWin();
    if (checkFullBoard() || winState) {
      handleFinishedGame(winState);
    }
  };

  return (
    <div class={tw`flex items-center justify-center flex-col `}>
      <Wordle
        previousGuesses={previousGuesses}
        addChar={addChar}
        delChar={delChar}
        checkRow={checkRow}
      />
      <span
        class={tw`bg-gray-100 items-center justify-center rounded flex p-2`}
      >
        <Keyboard
          previousGuesses={previousGuesses}
          addChar={addChar}
          delChar={delChar}
          checkRow={checkRow}
        />
        <hr class={tw`border-l-1  border-gray-700 h-12`} />
        <Hints guesses={previousGuesses} CONFIG={CONFIG} />
      </span>
    </div>
  );
}
