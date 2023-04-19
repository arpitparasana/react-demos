import React, { useEffect, useState } from "react";
import AdminHome from "./AdminHome";
import Cart from "./Cart";
import { testExport, food } from "./DataRepo";
import FoodNavigator from "./FoodNavigator";
import MyButton from "./MyButton";
import PublicHome from "./PublicHome";
import './styles.css';
import { Link } from "react-router-dom";

export default function MyApp() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInCount, setLoggedInCount] = useState(0);
    const [currentItem, setCurrentItemForCart] = useState();
    const [addItemToCart, setAddItemToCart] = useState();

    useEffect(() => {
        loggedIn && setLoggedInCount(loggedInCount + 1);
    }, [loggedIn]);

    const handleLogin = () => {
        setLoggedIn(loggedIn ? false : true);
    }

    function addToCart() {
        let item = {name:''}
        item.name = currentItem.name;
        setAddItemToCart(item);
    }


    return (
        <div className='container'>
            <h1>Welcome to main concept page</h1>
            <hr />
            <FoodNavigator currentItemForCart={currentItem} setCurrentItemForCart={setCurrentItemForCart} /> <br />
            <button onClick={addToCart}>Add to cart</button><br />
            <Cart addItemToCart={addItemToCart}/>
            <hr />
            <p>Example of a new component that can dynamically be used within other components</p>
            <MyButton styleClass='p-blue' label={'Blue Button'} /> &nbsp;
            <MyButton styleClass='p-red' label="Red Button" />
            <hr />
            <p className="p-blue">{testExport}</p>
            <hr />
            {loggedIn ? <AdminHome /> : <PublicHome />}
            <MyButton styleClass={loggedIn ? 'p-blue' : 'p-red'} onClick={handleLogin} label={loggedIn ? 'Logout' : 'Login'} />
            <p>Count of logins: {loggedInCount}</p>
            <p>[Example of lifting state up by keeping login counts in parent component]</p>
            <hr />
            <p>Rendering buttons using Map on Array list of String</p>
            {food.map((item) => {
                return <li key={item.id} className={item.type === '1' ? 'veg' : 'fruit'}>{item.name}</li>
            })}
            <hr />
            <Link to='reacttable'>React table demo</Link>
        </div>
        
    );
}