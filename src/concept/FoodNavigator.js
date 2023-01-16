import { useEffect, useState } from "react";
import { food } from "./DataRepo";

export default function FoodNavigator() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log('In useEffect(): index is ' + currentIndex);
    }, [currentIndex]);

    function handlePrevious() {
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex);
    }

    function handleNext() {
        setCurrentIndex(currentIndex < food.length - 1 ? currentIndex + 1 : currentIndex);
    }

    return (
        <>
            <p>Navigate through items in the food list</p>
            <button onClick={handlePrevious}>&lt;</button>&nbsp;&nbsp;
            <button onClick={handleNext}>&gt;</button>
            <br />
            {food[currentIndex].name}
        </>
    );
}