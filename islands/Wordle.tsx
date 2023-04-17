/** @jsx h */
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { tw } from "@twind";
import { NumberSpace } from "../routes/index.tsx";
import NumberBox from "./NumberBox.tsx";
import { KeyHandler } from "./MainGame.tsx";

interface WordleProps {
  previousGuesses: NumberSpace[][];
  addChar: KeyHandler;
  delChar: KeyHandler;
  checkRow: KeyHandler;
}

type Handler = (key: { key: string }) => void;

const useEventListener = (eventName: string, handler: Handler) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: { key: string }) =>
      savedHandler.current(event);
    globalThis.addEventListener(eventName, eventListener);
    return () => {
      globalThis.removeEventListener(eventName, eventListener);
    };
  }, [eventName, globalThis]);
};

export default function Wordle({
  previousGuesses,
  addChar,
  delChar,
  checkRow,
}: WordleProps) {

  const handler: Handler = ({ key }) => {
    const KeyHandler = {
      Enter: checkRow,
      Backspace: delChar,
      Number: addChar,
    };

    if (Number(key) || key === "0") KeyHandler["Number"](key);
    else if (key === "Enter" || key === "Backspace") KeyHandler[key]();
  };

  useEventListener("keydown", handler);

  return (
    <div class={tw` h-full flex flex-col gap-1 p-10  items-center`}>
      {previousGuesses.map((guess) => (
        <div class={tw`flex gap-1 `}>
          {guess.map((number) => (
            <NumberBox number={number} />
          ))}
        </div>
      ))}
    </div>
  );
}
