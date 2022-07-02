import { bgGreen, bgYellow, bgBrightBlack, bgRed, bold } from "https://deno.land/std@0.146.0/fmt/colors.ts"

const MAX_TRIES = 5
const previousGuesses:any = []

//For printing the guesses in this try and mark errors =>
let globalResults = ''

//Random number for the guess =>
const number = Math.floor(Math.random() * 8999) + 1000

function colorLetter(i:number, letter:string):any {
    if(letter == `${number}`[i]) return bgGreen(bold(` ${letter} `))
    if(`${number}`.includes(letter)) return bgYellow(bold(` ${letter} `))
    return bgBrightBlack(bold(` ${letter} `))
}

function print(guess){
    console.clear()
    console.log('\n')

    let readyGuess:string  = ''

    guess.forEach((letter, i) => {
        readyGuess += `${colorLetter(i, letter)} `
    })

    globalResults += `\t${readyGuess}\n\n`

    console.log(globalResults)

}

function askNumber() {
    let prmt = prompt('The number is...')
    const response:number = Number(prmt)

    if(!Number(prmt)) return {error: 'The number must be possible!'}

    if(response < 1000 || response > 9999)return {error: 'The number is between 1000 and 10000 (not inclusive)'}

    if(previousGuesses.includes(response)) return {error: 'You alredy tried this number! '} 
    else previousGuesses.push(response)
  
    return {response}
}

function start(tries: number):void{
    if(!tries){
	console.log(`You have ${MAX_TRIES} max tries! And...\n${bgYellow(bold('The number is between 1000 and 10000 (not inclusive)'))}`)
    }

    if(tries >= MAX_TRIES){
        console.log(bgRed(bold(` You lost! The number was ${number} `)) + '\n')
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
        print([...`${guess}`])
        console.log('\t' + bgGreen(bold(' You Won! ')) + '\n')
        return
    } else{
        print([...`${guess}`])
        tries++
        start(tries)
    }
}

start(0)


