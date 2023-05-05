import React, { useEffect, useState } from "react";

export default function Cart(props) {
    const [itemsInCart, setItemsInCart] = useState([]);
    let cartSize = itemsInCart.length;

    useEffect(() => {
        if (props.addItemToCart !== undefined) {
            let added = false;
            itemsInCart.forEach(item => {
                if (item.name === props.addItemToCart.name && added === false) {
                    item.count = item.count + 1;
                    added = true;
                }
            });
            if (added === false) {
                itemsInCart.push({ name: props.addItemToCart.name, count: 1, available: props.addItemToCart.available })
            }
        }
        setItemsInCart(itemsInCart);
    }, [props.addItemToCart])

    function handleAddRemoveItem(item, action) {
        let nextItemSet = itemsInCart.map((f)=>{
            if(f.name === item.name) {
                if(action === '-' &&  f.count > 0){
                    return {...f, count: f.count - 1}
                } else if(action === '+' && f.count < f.available) {
                    return {...f, count: f.count + 1}
                } else {
                    return f;
                }
            } else {
                return f;
            }
        })
        nextItemSet = nextItemSet.filter(i => i.count > 0);
        setItemsInCart(nextItemSet);
    }

    return (
        <React.StrictMode>
        <>
            <h5>Total Items in cart: {cartSize}</h5>

            {itemsInCart.map((item, i) => {
                return(  
                     <div key={item.name}>
                        <button onClick={()=>handleAddRemoveItem(item,'-')}> - </button>
                        &nbsp;<button onClick={()=>handleAddRemoveItem(item,'+')}> + </button>
                        &nbsp;{item.name} x  {item.count}
                    </div>
                );
            })} 
        </>
        </React.StrictMode>
    );
}