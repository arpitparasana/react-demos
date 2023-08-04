import { useMemo, useState } from "react";

export default function Bind(props) {

    const [year, setYear] = useState(2023);
    const [value, setValue] = useState(1);
    let render = true;
    const incrementValue = (e) => {
        let newValue = value + 1;
        setValue(newValue);
    }

    const handleFilterBy = (e) => {
        setYear(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        alert("Current Year: " + year + ", Current Value: " + value);
    }

    const data = useMemo(() => {return <button id="memoButton" onClick={(e)=>handleClick(e)}>Test value</button>});

    return(
    <>
        <h1>Binding Variable to Function after state update</h1>
        <select id="academicYear" onChange={e => handleFilterBy(e)}>    
            <option key="2023" label = "2023">2023</option>
            <option key="2024" label = "2024">2024</option>
            <option key="2025" label = "2025">2025</option>
            <option key="2026" label = "2026">2026</option>
            <option key="2027" label = "2027">2027</option>
        </select>
        <p>Current Year: {year}</p>
        <p>Current Year: {value}</p>
        <button onClick={(e)=>incrementValue(e)}>Increment Value</button><br />
        <button onClick={(e)=>handleClick(e)}>Test value</button><br />
        {data}
    </>
    );
}
