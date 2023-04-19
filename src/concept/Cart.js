import React, { useEffect, useState } from "react";

export default function Cart(props) {
    const [itemsInCart, setItemsInCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        if (props.addItemToCart !== undefined) {
            let added = false;
            itemsInCart.forEach(item => {
                if (item.name === props.addItemToCart.name && added === false) {
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
        <React.StrictMode>
        <>
            <h5>Total Items in cart: {cartSize}</h5>

            {itemsInCart.map((item, i) => {
                return (
                    <div key={item.name}>
                        {item.name} x  {item.count}
                        &nbsp;<button> - </button>
                        &nbsp;<button> + </button>
                    </div>
                );
            })} 
        </>
        </React.StrictMode>
    );
}