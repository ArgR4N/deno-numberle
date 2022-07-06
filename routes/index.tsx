/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Wordle from "../islands/Wordle.tsx";

export default function Home() {
  return (
    <div 
      style={{height:'100vh'}} 
      class={tw`bg-[#ffffff] h-full p-4 mx-auto max-w-screen-md`}
    >
      <h1 class={tw`text-center font-bold text-gray-700`}>NUMBERLE</h1>
      <hr />
      <Wordle tries={0} />
    </div>
  );
}
