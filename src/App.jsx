import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(() => allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const randomDice = []

        for(let i = 0; i < 10; i++) {
            randomDice.push(generateNewDie())
        }

        return randomDice
    }

    function rollDice() {
        setDice((prevDice) => prevDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))

        setRolls((prevRolls) => prevRolls + 1)
    }

    function holdDice(dieId) {
        setDice((prevDice) => prevDice.map((die) => {
            if(die.id === dieId) {
                return {...die, isHeld: !die.isHeld}
            } else {
                return die
            }
        }))
    }

    function resetGame() {
        //set high score
        if((JSON.parse(localStorage.getItem("highScore")) || Infinity) > rolls) {
            localStorage.setItem("highScore", JSON.stringify(rolls))
        }
        
        setDice(allNewDice);
        setTenzies(false);
        setRolls(0)
    }

    const diceElements = dice.map((die) => {
        return <Die 
            key={die.id} 
            id={die.id}
            value={die.value} 
            isHeld={die.isHeld}
            holdDice={holdDice}
        />
    })

    React.useEffect(() => {
        const checkVal = dice[0].value
        const win = dice.every((die) => die.value === checkVal && die.isHeld)

        if(win) {
            setTenzies(true)
        }
        
    }, [dice])

    return (
        <main className="container">
            {tenzies && <Confetti />}

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each 
                die to freeze it at its current value between rolls.
            </p>
            <p className="highScore">High Score: {JSON.parse(localStorage.getItem("highScore")) || 0}</p>
            <p className="numberRolls">Rolls: {rolls}</p>
            
            <div className="dice-container">
                {diceElements}
            </div>

            {tenzies ? 
                <button className="roll-button" onClick={resetGame}>New Game</button> :
                <button className="roll-button" onClick={rollDice}>Roll</button>
            }
        </main>
    )
}