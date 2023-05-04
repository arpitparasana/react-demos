import { useContext } from "react";
import { ThemeContext } from "./MyApp";

export default function ContextDemo() {
    const theme = useContext(ThemeContext);
    return(
        <div style={theme === 'Dark' ? {backgroundColor: '#67a4d9'}:{}}>
            <p>Demo to show how to use useContext</p>
            <p>Context lets components pass information deep down without explicitly passing props.</p>
            Current theme: <b>{theme}</b>
        </div>
    );
}