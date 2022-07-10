/** @jsx h */
import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import { createContext } from "preact/src"
import { tw } from "@twind";
import MainGame from "../islands/MainGame.tsx";


//Main Classes and Interfaces =>
export class NumberSpace{
  color: string;
  value: string;

  constructor(n ?: string){
    this.color = 'gray';
    this.value = n ? n : ''
  }

  ChangeColor(color: string): NumberSpace{
    this.color = color
    return this
  }
}

 class WordleInstance{
    max_tries: number;
    previousGuesses: NumberSpace[][]
    setPreiousGuesses: StateUpdater<NumberSpace[][]>

    constructor(max: number, ){
      this.max_tries = max
      const [this.previousGuesses, this.setPreviousGuesses] = useState([])
      
    }

 }

export interface Configuration{
  COLORS_VALUES: {[n: string]:string},
  NUMBER_LENGTH: number,
  MAX_TRIES: number,
  NUMBER: number,
}
// <= Main Classes and Interfaces 

const getRandomNumber = () => Math.floor(Math.random() * (Math.pow(10, 4) - 1 - Math.pow(10, 4 - 1)) + Math.pow(10, 4 - 1))

//Main Config =>
const CONFIG:Configuration = {
  NUMBER_LENGTH: 4,
  MAX_TRIES: 5,
  NUMBER: getRandomNumber(),
  COLORS_VALUES: {
    'yellow':'yellow-300',
    'red':'red-500',
    'green':'green-200',
    'gray':'gray-200'
  }
}
//<= Main Config

export default function Home() {
  
  return (
    <div 
      style={{height:'100vh'}} 
      class={tw`bg-[#ffffff] h-full p-4 mx-auto max-w-screen-md`}
    >
      <h1 class={tw`text-center font-bold text-gray-700`}> NUMBERLE </h1>
      <hr />

        <MainGame 
          CONFIG = { CONFIG } 
        />

    </div>
  );
}
