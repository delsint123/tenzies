import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(() => allNewDice())

    function allNewDice() {
        const randomDice = []

        for(let i = 0; i < 10; i++) {
            randomDice.push({
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
            })
        }

        return randomDice
    }

    function rollAllDice() {
        setDice(allNewDice);
    }

    const diceElements = dice.map((die) => {
        return <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld}
        />
    })

    return (
        <main className="container">
            
            <div className="dies">
                {diceElements}
            </div>

            <button 
                className="roll-button"
                onClick={rollAllDice}
            >
                Roll
            </button>
        </main>
    )
}