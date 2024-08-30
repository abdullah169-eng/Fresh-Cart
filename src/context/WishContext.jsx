import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const wishContext = createContext();
export default function WishContextProvider({ children }) {
  // UseStates to Change Wishlist display
  const [allWishProduct, setAllWishProduct] = useState(null);
  const [allWishId, setAllWishId] = useState(null);
  const [bite, setBite] = useState(null);
  // Token of the current User
  let headers = { token: localStorage.getItem("tkn") };
  // Add Product to Wish-list
  async function addWishProduct(id) {
    let rtnContainer = {};
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => {
        displayWishlist();
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
  // Disply Products of Wish
  async function displayWishlist() {
    headers = { token: localStorage.getItem("tkn") };
    let x = [];
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setAllWishProduct(res.data.data);
        for (let i = 0; i < res.data.data.length; i++) {
          x.push(res.data.data[i]._id);
        }
        setAllWishId(x);
      })
      .catch((error) => {
        setAllWishProduct([]);
        toast.success(error.response.data.message, {
          duration: 2000,
        });
      });
  }
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      displayWishlist();
    }
  }, []);
  // Delete Product from Wish-list
  async function deleteWishProduct(id) {
    let rtnContainer = {};
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => {
        displayWishlist();
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
  return (
    <wishContext.Provider
      value={{
        addWishProduct,
        allWishProduct,
        deleteWishProduct,
        allWishId,
        bite,
        setBite,
        displayWishlist,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
