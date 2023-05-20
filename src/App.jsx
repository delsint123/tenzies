import React from "react"
import Die from "./components/Die"

export default function App() {

    const [dice, setDice] = React.useState(() => allNewDice())

    function allNewDice() {
        const randomDice = []

        for(let i = 0; i < 10; i++) {
            randomDice.push(Math.ceil(Math.random() * 6))
        }

        return randomDice
    }

    const diceElements = dice.map((val, idx) => {
        return <Die key={idx} value={val} />
    })

    return (
        <main className="container">
            
            <div className="dies">
                {diceElements}
            </div>
        </main>
    )
}