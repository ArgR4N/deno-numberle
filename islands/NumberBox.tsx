/** @jsx h */
import { h } from "preact";
import {tw} from '@twind'
import { NumberSpace } from './Wordle.tsx'


export default function NumberBox({ number }: {number: NumberSpace}){
    const { color, value } = number 
    
    return (
        <div class={tw`flex items-center justify-center bg-[#ffffff] w-8 h-8 border-2 text-grey-200 border-${ color }-200 rounded`}>
            <p class={tw`font-bold text-grey-700`}>{ value }</p>
        </div>
    )
}