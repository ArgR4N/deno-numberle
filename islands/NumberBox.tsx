/** @jsx h */
import { h } from "preact";
import {tw} from '@twind'
import { NumberSpace } from '../routes/index.tsx'


export default function NumberBox({ number }: {number: NumberSpace}){
    const { color, value } = number 
    const styles: { [name: string]:string } = {
        'yellow':'yellow-300',
        'red':'red-500',
        'green':'green-300'
    }
    return (
        <div class={tw`flex items-center justify-center bg-[#ffffff] w-8 h-8 border-2 text-grey-200 border-${ styles[color] } rounded`}>
            <p class={tw`font-bold text-grey-700`}>{ value }</p>
        </div>
    )
}