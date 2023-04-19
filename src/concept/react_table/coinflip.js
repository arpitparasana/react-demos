import { useState } from "react";

const flip = () => {
    return Math.random() < 0.5;
}
const CoinFlip = (props) => {
    const [state, setState] = useState(flip);
    
    const handleClick = () => {
        setState(flip);
    }

    return(
    <>
        {props.children({flip: handleClick, isHeads: state})}
    </>);
}

export default CoinFlip;