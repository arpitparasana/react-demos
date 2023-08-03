import { useState } from "react";

export default function Bind(props) {

    const [year, setYear] = useState(2023);

    const incrementValue = (e) => {
        let newValue = year + 1;
        setYear(newValue);
    }

    const handleClick = e => {
        e.preventDefault();
        alert(year);
    }

    return(
    <>
        <h1>Binding Variable to Function after state update</h1>

        <p>Current Year: {year}</p>
        <button onClick={(e)=>incrementValue(e)}>Increment Value</button><br />
        <button onClick={(e)=>handleClick(e)}>Test value</button>
    </>
    );
}
