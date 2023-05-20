import React from "react";

export default function Die(props) {
    return (
        <div>
            <p className="die-face">{props.value}</p>
        </div>
    )
}