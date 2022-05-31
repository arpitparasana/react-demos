import { useState } from "react";


const Random = () => {

    const [age, setAge] = useState(25);
    const [fruit, setFruit] = useState("Banana");
    const [todos, setTodos] = useState([{text: "Learn Hooks"}]);

    return (
        <>
        <p>Age: {age}
        Fruit: {fruit}
        Todo: {todos.map(
            todo => <p>{todo.text}</p>
        )}</p>
        </>
    );
}

export default Random;