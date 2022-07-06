/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import {tw} from '@twind'

interface WordleProps {
  tries: number
}



const useEventListener = (eventName:any, handler:any, element:any = window) => {
  const savedHandler:{current: Function} = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event:any) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

const MAX_TRIES = 6

const ABC = ["A", "B", "C"]

export default function Wordle(props: WordleProps) {
  const [previousGuesses, setPreviousGuesses] = useState(Array(MAX_TRIES).fill(''))
  const [actualGuess, setActualGuess] = useState(0)

  const handler = ({ key }) => {
    if(ABC.includes(key)){
      if(previousGuesses[actualGuess].length < MAX_TRIES - 1) {
      const arr = previousGuesses
      arr[actualGuess] += key;
      setPreviousGuesses([...arr])
       }
    }
    if(key == 'Enter' && previousGuesses[actualGuess].length == 5) setActualGuess(p => p + 1)
  };

  useEventListener('keydown', handler)
  //Fix tailwind problem (doesn´t work xd) =>
  return <div class={tw`h-full flex flex-col gap-4 p-10  items-center`} >
    {
      previousGuesses.map((guess, i) => (
        <div class={tw` flex gap-4 w-fit-content`}>
            {
              [...guess].map(letter => (

                  <div class={tw`bg-green-100 py-3 px-5`}>

                      {letter}

                  </div>

              ))
            }
        </div>
      ))
    }
  </div>
}
