import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img class=
                "img-fluid" src={el.image} width={150} />
            {el.title}
            ${el.price}
        </div>
    ));

    const removeFromCart = (el) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === el.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    useEffect(() => {
        total();
    }, [cart]);

    const listItems = items.map((el) => (
        <div key={el.id}>
            <img class=
                "img-fluid" src={el.image} width={100} />
            {el.title}
            {el.category}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}> - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> +</button>
        </div>
    ));

    return (
        <div>
            <div>{listItems}</div>
            <div>Itesm in Cart :</div>
            <div>{cartItems}</div>
            <div>Order total to pay :{cartTotal}</div>
        </div>
    );
};



export default Shop;