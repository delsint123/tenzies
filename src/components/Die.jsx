import React from "react";

export default function Die(props) {
    return (
        <div>
            <p className={props.isHeld ? "die-face-held" : "die-face"}>{props.value}</p>
        </div>
    )
}