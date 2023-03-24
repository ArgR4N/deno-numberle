/** @jsx h */
import { h, Component } from "preact";
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

//  class WordleInstance extends Component{
//     constructor(max: number, ){
//       super() 
//     }
//     render() {
//     return <div></div>
//     }

//  }

export interface Configuration{
  COLORS_VALUES: {[n: string]:string},
  NUMBER_LENGTH: number,
  MAX_TRIES: number,
  NUMBER: number,
}
// <= Main Classes and Interfaces 

export const getPrime = ( n: number ) => {
  let isPrime = true;
    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
  return true
}

export const getEven = ( n:number ) => n % 2;



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
