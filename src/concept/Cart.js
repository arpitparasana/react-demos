import { useEffect, useState } from "react";

export default function Cart(props) {
    const [itemsInCart, setItemsInCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        if (props.addItemToCart !== undefined) {
            let added = false;
            itemsInCart.forEach(item => {
                if (item.name === props.addItemToCart.name && added === false) {
                    console.log('Adding ' + props.addItemToCart.name);
                    item.count = item.count + 1;
                    added = true;
                    setCartSize(cartSize + 1);
                }
            });
            if (added === false) {
                itemsInCart.push({ name: props.addItemToCart.name, count: 1 })
                setCartSize(cartSize + 1);
            }
        }
        setItemsInCart(itemsInCart);

        console.log(itemsInCart);
    }, [props.addItemToCart])

    useEffect(() => {

    }, [cartSize])


    return (
        <>
            <h5>Total Items in cart: {cartSize}</h5>

            {itemsInCart.map((item) => {
                return <li key={item.name}>{item.name} x  {item.count} </li>
            })} 
        </>
    );
}