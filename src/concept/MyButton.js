import { useState } from "react";

export default function MyButton(props) {

    function handleClick() {
    }

    return (
        <>
        <button className={props.styleClass} onClick={handleClick}>{props.label}</button>
        </>
    );
}