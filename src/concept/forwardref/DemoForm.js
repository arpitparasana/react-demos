import { forwardRef, useEffect, useRef } from "react";
import { forwardRefCaveat } from "../DataRepo";
import { Link } from "react-router-dom";

function DemoForm(props) {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.style.width = '150px';
    }) 

    const handleClick = () => {
        inputRef.current.value = 'Filled this with forwarded reference';
        inputRef.current.focus();
        inputRef.current.style.width = (inputRef.current.value.length * 6) + 'px';
    }

    const resetInput = () => {
        inputRef.current.value='';
        inputRef.current.style.width = '150px';
    }

    return(
        <div className="container">
            <Link to='/'>Back to Main Page</Link>
            <h1>forwardRef Demo using form and input box</h1>
            <InputBox ref={inputRef}/><br/>
            <button onClick={handleClick}>Fill the input box</button>&nbsp;
            <button onClick={resetInput}>Reset</button>
            <br/><br/><br/>
            <p>{forwardRefCaveat.text}</p>
            <p><i>note reference: <a href={forwardRefCaveat.ref} target='_blank' rel='noreferrer noopener'>{forwardRefCaveat.ref}</a></i></p>
        </div>
    );
}

const InputBox = forwardRef((props, ref)=>{
    return(<>
        <input type='text' ref={ref}/>
    </>)
})

export default DemoForm;