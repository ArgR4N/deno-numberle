/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import {tw} from '@twind'
import NumberBox from "./NumberBox.tsx"

//Preact type=>
type StateUpdater<S> = (value: S | ((prevState: S) => S)) => void;


//Const´s =>
const MAX_TRIES = 5
const NUMBER_LENGTH = 4
const NUMBERS = Array(10).fill('').map((_ , i) => String(i));
const MAX = Math.pow(10, NUMBER_LENGTH) - 1
const MIN = Math.pow(10, NUMBER_LENGTH - 1)
const NUMBER = Math.floor(Math.random() * (MAX - MIN) + MIN)

//Interfaces =>
interface WordleProps { tries: number }
interface Key{ key: string }

//Types =>
type Handler = (key: { key: string} ) => void;
type KeyHandler = (key: string) => void


//Other Functions =>
const useEventListener = (eventName: string, handler: Handler) => {
  const savedHandler:{ current: Handler } = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: { key : string }) => savedHandler.current(event);
    globalThis.addEventListener(eventName, eventListener);
    return () => {
      globalThis.removeEventListener(eventName, eventListener);
    };
  }, [eventName, globalThis]);
};

//Main function =>
export default function Wordle( { CONFIG }:WordleProps ) {
  const { MAX_TRIES, NUMBER_LENGTH, NUMBER } = CONFIG
//Classes =>
class ActualGuessPair {
  first: number;
  second: number;

  constructor(first: number, second: number){
    this.first = first,
    this.second = second
  }

  addFirst(setter: StateUpdater<ActualGuessPair>){
    this.first < MAX_TRIES - 1 && setter(new ActualGuessPair(this.first + 1, 0))
  }

  addSecond(setter: StateUpdater<ActualGuessPair>){
    setter( 
      new ActualGuessPair(this.first, 
        NUMBER_LENGTH - 1 > this.second 
          ? this.second + 1 
          : this.second))
  }

  minusSecond(setter: StateUpdater<ActualGuessPair>){
    setter(      
      new ActualGuessPair(this.first,
        this.second > 0
        ? this.second - 1
        : this.second))
  }
}

export class NumberSpace{
  color: string;
  value: string;

  constructor(n: string | false){
    this.color = 'grey';
    this.value = ''
  }

  ChangeColor(color: string): NumberSpace{
    this.color = color
    return this
  }
}

//Other Functions =>
const useEventListener = (eventName: string, handler: Handler) => {
  const savedHandler:{ current: Handler } = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: { key : string }) => savedHandler.current(event);
    globalThis.addEventListener(eventName, eventListener);
    return () => {
      globalThis.removeEventListener(eventName, eventListener);
    };
  }, [eventName, globalThis]);
};

//Main function =>
export default function Wordle(props: WordleProps) {
  const [previousGuesses, setPreviousGuesses] = useState(Array(MAX_TRIES).fill('').map(_ => Array(NUMBER_LENGTH).fill('').map(_ => new NumberSpace())))
  const [actualGuess, setActualGuess] = useState(new ActualGuessPair(0, 0))

  const colorNumbers: (guess: NumberSpace[]) => void = (guess) =>{
    const objective = String(NUMBER)
    const newGuess: NumberSpace[] = guess.map((num: NumberSpace, i: number) => (
      num.value == objective[i]
      ? num.ChangeColor('green')
      : objective.includes(num.value)
        ? num.ChangeColor('yellow')
        : num
    ))
    const newGuesses = previousGuesses.slice()
    newGuesses[actualGuess.first] = newGuess

      console.log(newGuess)

    setPreviousGuesses(newGuesses)

  }
  const checkWin: ( ) => boolean = ( ) => {
    if(Number(previousGuesses[actualGuess.first][actualGuess.second]) === NUMBER){
      //Handle win =>
    }
    return false
  }

  const checkLength: (n: number) => boolean = n => {
    let sum = 0
    previousGuesses[actualGuess.first].forEach(el => {
      if(el.value) sum++
    })
    return sum === n
  }

  const checkRow:KeyHandler = () =>{
    if(checkLength(NUMBER_LENGTH)){
      colorNumbers(previousGuesses[actualGuess.first])
      actualGuess.addFirst(setActualGuess)
    }
    //if(checkWin()) endGame()
  }
  const delChar:KeyHandler = () =>{
    const newGuess = previousGuesses.slice()
    console.log(NUMBER_LENGTH, actualGuess.second)
    if(!previousGuesses[actualGuess.first][actualGuess.second].value){
      newGuess[actualGuess.first][actualGuess.second - 1].value = ''   
      actualGuess.minusSecond(setActualGuess)
    }
    else newGuess[actualGuess.first][actualGuess.second].value = ''
    setPreviousGuesses(newGuess)
  }
  const addChar:KeyHandler = (key) =>{
    if(!previousGuesses[actualGuess.first][actualGuess.second].value) {
      const newGuess = previousGuesses.slice()

      //Working without the setter => ????
      newGuess[actualGuess.first][actualGuess.second].value = key 

      // ¡¡¿¿ => => => setPreviousGuesses(newGuess) <= <= <= ??!!

      setPreviousGuesses(newGuess)

      actualGuess.addSecond(setActualGuess)
    } else{
      //Error -> Full length!
    }
  }
  const handler: (key:Key) => void = ({ key }) => {
    const KeyHandler:{[name: string]: KeyHandler} = {
      'Enter': checkRow,
      'Backspace': delChar,
      'Number': addChar,
    }

    NUMBERS.includes(key) ? KeyHandler['Number'](key)
    : KeyHandler[key](key)

    //Letras especiales =>
      //Espacio -> Chequear que el numero este completo
      //Del -> Chequear qu1e no este vacio y eliminar el ultimo caracter
    //Caracter (Espacio Excluido) -> Chequear que sea numero, y agregarlo a la posicion indicada 

  }
  
  useEventListener('keydown', handler)

  return <div class={tw` h-full flex flex-col gap-4 p-10  items-center`} >
    {
      previousGuesses.map((guess: NumberSpace[]) => (
        <div class={tw`flex gap-5 `}>
            {
              guess.map((number: NumberSpace) => <NumberBox number={number}/> )
            }
        </div>
      ))
    }
  </div>
}
