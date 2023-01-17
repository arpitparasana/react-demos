import { useEffect, useState } from "react";
import { food } from "./DataRepo";

export default function FoodNavigator(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [type, setType] = useState('0');
    const [currentItemForCart, setCurrentItemForCart] = useState();

    useEffect(() => {
        setType(food[currentIndex].type);
        setCurrentItemForCart(food[currentIndex]);
        props.setCurrentItemForCart(food[currentIndex]);
    }, [currentIndex]);

    function handlePrevious() {
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex);
    }

    function handleNext() {
        setCurrentIndex(currentIndex < food.length - 1 ? currentIndex + 1 : currentIndex);
    }

    return (
        <>
            <p>Navigate through items in the list</p>
            <button onClick={handlePrevious}><b>&lt;</b></button>&nbsp;&nbsp;
            <button onClick={handleNext}><b>&gt;</b></button>&nbsp;&nbsp;
            <br />
            <p className={type === '1' ? 'veg' : 'fruit'}>{food[currentIndex].name}</p>
            {food[currentIndex].imgurl !== '' &&
                <img src={food[currentIndex].imgurl} alt='Apple'
                    height='100px' width='100px'></img>
            }
        </>
    );
}