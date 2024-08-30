import React, { useContext, useState } from "react";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import Loader from "./../../sup-pages/Loader/Loader";
import toast from "react-hot-toast";
import { wishContext } from "../../../context/WishContext";
import { cartContext } from "../../../context/CartContext";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Wishlist() {
  DocumentTitle("Wishlist");
  const { allWishProduct, deleteWishProduct } = useContext(wishContext);
  const { addProduct } = useContext(cartContext);
  // Handle Delete Product
  const [delClick, setDelClick] = useState(null);
  async function handleDeleteProduct(id) {
    setDelClick(id);
    const { resFlag, userMessage } = await deleteWishProduct(id);
    if (resFlag) {
      toast.success(userMessage, {
        duration: 2000,
      });
    } else {
      toast.error(userMessage, {
        duration: 2000,
      });
    }
  }
  // Adding Product to Cart
  const [addClick, setAddClick] = useState(null);
  async function handleAdding(id) {
    setAddClick(id);
    const { resFlag, userMessage } = await addProduct(id);
    if (resFlag) {
      toast.success(userMessage, {
        duration: 2000,
      });
    } else {
      toast.error(userMessage, {
        duration: 2000,
      });
    }
    setAddClick(null);
  }
  return (
    <>
      <TitleHeader title="My Wishlist" />
      {allWishProduct ? (
        allWishProduct.length == 0 ? (
          <section className="flex justify-center items-center p-5 h-[50vh]">
            <div className="text-[#0aad0a] text-center">
              <h1 className="text-5xl font-semibold my-5">
                Your Wishlist is Empty
              </h1>
              <h1 className="text-xl font-medium text-black">
                Add products to show in the Wishlist
              </h1>
            </div>
          </section>
        ) : (
          <section className="px-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#0aad0a]">
                  <tr className="text-center">
                    <th scope="col" className="py-3">
                      Image
                    </th>
                    <th scope="col" className="py-3">
                      Product
                    </th>
                    <th scope="col" className="py-3">
                      Price
                    </th>
                    <th scope="col" className="py-3">
                      Adding
                    </th>
                    <th scope="col" className="py-3">
                      Removing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allWishProduct.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className="text-center bg-white border-b hover:bg-gray-50"
                      >
                        <td>
                          <img
                            src={product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full mx-auto"
                            alt={product.title}
                          />
                        </td>
                        <td className="font-semibold text-gray-900 px-5">
                          {product.title}
                        </td>
                        <td className=" font-semibold text-gray-900 px-2">
                          {product.price} EGP
                        </td>
                        <td className="px-2">
                          <a
                            onClick={() => {
                              handleAdding(product._id);
                            }}
                            className={`font-medium text-[#0aad0a] cursor-pointer hover:underline ${
                              addClick == product._id && "opacity-50"
                            }`}
                          >
                            Add to Cart
                          </a>
                        </td>
                        <td className="px-2">
                          <i
                            className={`md:mx-10 text-xl fa-solid fa-trash-can text-red-600 cursor-pointer ${
                              delClick == product._id && "fa-bounce"
                            }`}
                            onClick={() => {
                              handleDeleteProduct(product._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
