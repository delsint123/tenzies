import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(() => allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

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

    //may remove
    function resetDice() {
        setDice(allNewDice);
    }

    function rollDice() {
        setDice((prevDice) => prevDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
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
            console.log("you won")
        }
        
    }, [dice])

    return (
        <main className="container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each 
                die to freeze it at its current value between rolls.
            </p>
            
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-button" onClick={rollDice}>Roll</button>
        </main>
    )
}