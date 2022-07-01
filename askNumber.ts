import { green } from "https://deno.land/std@0.146.0/fmt/colors"

const MAX_TRIES = 6
const previousGuesses:any = []

//For printing the guesses in this try and mark errors =>
let globalResults = ''

//Random number for the guess =>
let number = Math.floor(Math.random() * 9999) + 1000

function colorLetter(i:number, letter:string):any {
    
}

function print(guess){
    let readyGuess:Array<string> = []

    guess.forEach((letter, i) => {
        readyGuess.push(colorLetter(i, letter)) 
    });

    globalResults += `\t${readyGuess}\n`

    console.log(globalResults)

}

function askNumber() {
    let prmt = prompt('The number is...')
    const response:number = Number(prmt)

    if(!Number(prmt)) return {error: 'The number must be possible!'}

    if(response < 1000 || response > 9999)return {error: 'The number must be between 1000 and 9999(inclusive)'}

    if(previousGuesses.includes(response)) return{error: 'You alredy tried this number! '} 
    else previousGuesses.push(response)
  
    return {response}
}

function start(tries: number):void{
    if(tries >= MAX_TRIES){
        console.log(`You lost!\nThe number was ${number}`)
        return;
    }
    let guessExists:boolean = false
    let guess
    while(!guessExists){
        const {error, response} = askNumber()
        if(error){
            console.log(error)
            continue
        }else guessExists = true
        guess = response
    }

    if(guess == number){
        print(guess)
        console.log('You won!')
        return
    } else{
        print(guess)
        tries++
        start(tries)
    }
}

start(0)


