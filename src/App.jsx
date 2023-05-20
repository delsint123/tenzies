import React from "react"
import Die from "./components/Die"

export default function App() {

    const dies = []

    for(let i = 0; i < 10; i++) {
        dies.push(<Die key={i} value="1" />)
    }

    return (
        <main className="container">
            
            <div className="dies">
                {dies}
            </div>
        </main>
    )
}