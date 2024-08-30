import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  // UseStates to Change Cart display
  const [allProduct, setAllProduct] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  // Token of the current User
  let headers = { token: localStorage.getItem("tkn") };
  // Add Product to Cart
  async function addProduct(id) {
    let rtnContainer = {};
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => {
        displayCart();
        rtnContainer.userMessage = res.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      })
      .catch((error) => {
        rtnContainer.userMessage = error.response.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      });
  }
  // Disply Products of Cart
  async function displayCart() {
    headers = { token: localStorage.getItem("tkn") };
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setAllProduct(res.data.data.products);
        setCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
      })
      .catch((error) => {
        if (
          error.response.data.message.includes("No cart exist for this user:")
        ) {
          setAllProduct([]);
          setCartItems(0);
          setTotalCartPrice(0);
        }
      });
  }
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      displayCart();
    }
  }, []);
  // Update Count of Item
  async function updateCount(id, newCount) {
    let rtnContainer = {};
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((res) => {
        setAllProduct(res.data.data.products);
        setCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        rtnContainer.userMessage = res.data.status;
        rtnContainer.resFlag = true;
        return rtnContainer;
      })
      .catch((error) => {
        rtnContainer.userMessage = error.response.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      });
  }
  // Delete Product from Cart
  async function deleteProduct(id) {
    let rtnContainer = {};
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((res) => {
        setAllProduct(res.data.data.products);
        setCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        rtnContainer.userMessage = res.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      })
      .catch((error) => {
        rtnContainer.userMessage = error.response.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      });
  }
  // Clear Cart
  async function clearCart() {
    let rtnContainer = {};
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setAllProduct([]);
        setCartItems(0);
        setTotalCartPrice(0);
        rtnContainer.userMessage = res.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      })
      .catch((error) => {
        rtnContainer.userMessage = error.response.data.message;
        rtnContainer.resFlag = true;
        return rtnContainer;
      });
  }
  // Update cart UI After Payment
  function updateUI() {
    setAllProduct([]);
    setCartItems(0);
    setTotalCartPrice(0);
    setCartId(null);
  }
  return (
    <cartContext.Provider
      value={{
        addProduct,
        allProduct,
        cartItems,
        totalCartPrice,
        displayCart,
        updateCount,
        deleteProduct,
        clearCart,
        cartId,
        updateUI,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
