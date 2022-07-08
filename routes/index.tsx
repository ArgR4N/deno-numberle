/** @jsx h */
import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import { createContext } from "preact/src"
import { tw } from "@twind";
import MainGame from "../islands/MainGame.tsx";

//Main Config =>
const CONFIG = {
  NUMBER_LENGTH: 4,
  MAX_TRIES: 5,
  NUMBER: Math.floor(Math.random() * (Math.pow(10, 4) - 1 - Math.pow(10, 4 - 1)) + Math.pow(10, 4 - 1))
}
//<= Main Config

//Main Classes and Interfaces =>
export class NumberSpace{
  color: string;
  value: string;

  constructor(n ?: string){
    this.color = 'grey';
    this.value = n ? n : ''
  }

  ChangeColor(color: string): NumberSpace{
    this.color = color
    return this
  }
}
export interface Configuration{
  [name: string]: number
}
// <= Main Classes and Interfaces 


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
