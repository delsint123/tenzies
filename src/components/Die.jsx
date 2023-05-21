import React from "react";
import { nanoid } from "nanoid";

export default function Die(props) {

    const dots = [];

    for(let i = 0; i < props.value; i++) {
        dots.push(<span key={nanoid()} className="dot"></span>)
    }

    return (
        <div>
            <div 
                className={props.isHeld ? `die-face-held face-${props.value}` : `die-face face-${props.value}`}
                onClick={() => props.holdDice(props.id)}
            >{dots}</div>
        </div>
    )
}