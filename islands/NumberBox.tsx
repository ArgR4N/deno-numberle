/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { NumberSpace } from "../routes/index.tsx";

interface NumberBoxProps {
  number: NumberSpace;
}

export default function NumberBox({ number }: NumberBoxProps) {
  const { color, value } = number;

  return (
    <div
      class={tw`flex items-center justify-center bg-[#ffffff] w-[7vh] h-[7vh] border-2 text-grey-200 border-${color}-500 rounded`}
    >
      <p class={tw`font-bold text-grey-700`}>{value}</p>
    </div>
  );
}
