import { useContext } from "react";
import { ThemeContext } from "./MyApp";

export default function ContextDemo() {
    const theme = useContext(ThemeContext);
    return(
        <div>
            <p>Demo to show how to use useContext</p>
            <p>Context lets components pass information deep down without explicitly passing props.</p>
            <p>Theme value is being passed down here using context</p> 
            Current theme: <b>{theme}</b>
        </div>
    );
}