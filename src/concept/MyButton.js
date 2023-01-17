import { useState } from "react";

export default function MyButton(props) {

    return (
        <>
        <button className={props.styleClass} onClick={props.onClick}>{props.label}</button>
        </>
    );
}