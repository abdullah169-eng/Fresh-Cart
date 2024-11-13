import React, { useContext, useState } from "react";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import { cartContext } from "../../../context/CartContext";
import Loader from "./../../sup-pages/Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Cart() {
  DocumentTitle("Cart");
  const [isClicked, setIsClicked] = useState(false);
  const {
    allProduct,
    cartItems,
    totalCartPrice,
    updateCount,
    deleteProduct,
    clearCart,
  } = useContext(cartContext);
  // Handle Update Count
  async function handleUpdateCount(id, newCount) {
    const { resFlag, userMessage } = await updateCount(id, newCount);
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
  // Handle Delete Product
  const [delClick, setDelClick] = useState(null);
  async function handleDeleteProduct(id) {
    setDelClick(id);
    const { resFlag, userMessage } = await deleteProduct(id);
    if (resFlag) {
      toast.success("Product Deleted Successfully", {
        duration: 2000,
      });
    } else {
      toast.error(userMessage, {
        duration: 2000,
      });
    }
  }
  // Handle Clear Cart
  async function handleClearCart() {
    setIsClicked(true);
    const { resFlag, userMessage } = await clearCart();
    if (resFlag) {
      toast.success(userMessage, {
        duration: 2000,
      });
    } else {
      toast.error(userMessage, {
        duration: 2000,
      });
    }
    setIsClicked(false);
  }

  return (
    <>
      <TitleHeader title="My Cart" />
      {allProduct ? (
        allProduct.length == 0 ? (
          <section className="flex justify-center items-center p-5 h-[50vh]">
            <div className="text-[#0aad0a] text-center">
              <h1 className="text-5xl font-semibold my-5">
                Your Cart is Empty
              </h1>
              <h1 className="text-xl font-medium text-black">
                Add products to show in the Cart
              </h1>
            </div>
          </section>
        ) : (
          <section className="px-5">
            <article className="md:flex justify-between items-center text-center md:text-start md:px-16">
              <div className="mb-5">
                <p className="my-3 text-3xl font-semibold">
                  Total Price :
                  <span className="text-[#0aad0a] font-bold ms-2">
                    {totalCartPrice} EGP
                  </span>
                </p>
                <p className="my-3 text-3xl font-semibold">
                  Total Cart Items :
                  <span className="text-[#0aad0a] font-bold ms-2">
                    {cartItems}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link to="/cashPayment">
                  <button
                    type="submit"
                    className="bg-[#0aad0a] text-white rounded-lg w-64 h-10 font-semibold"
                  >
                    Payment
                  </button>
                </Link>
                <button
                  type="submit"
                  onClick={handleClearCart}
                  disabled={isClicked}
                  className="bg-white text-black border-2 border-[#0aad0a] rounded-lg w-64 h-10 font-semibold mx-auto"
                >
                  {!isClicked ? (
                    "Clear Cart"
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                  )}
                </button>
              </div>
            </article>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
              <table className="w-full text-sm text-left  text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#0aad0a]">
                  <tr className="text-center">
                    <th scope="col" className="py-3">
                      Image
                    </th>
                    <th scope="col" className="py-3">
                      Product
                    </th>
                    <th scope="col" className="py-3">
                      Quantity
                    </th>
                    <th scope="col" className="py-3">
                      Price
                    </th>
                    <th scope="col" className="py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allProduct.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className="text-center bg-white border-b hover:bg-gray-50"
                      >
                        <td>
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full mx-auto"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="font-semibold text-gray-900 px-5">
                          {product.product.title}
                        </td>
                        <td className="px-2">
                          <div className="md:flex items-center justify-center my-1">
                            <button
                              onClick={() => {
                                handleUpdateCount(
                                  product.product._id,
                                  product.count - 1
                                );
                              }}
                              className="inline-flex items-center justify-center p-1 md:me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              disabled={product.count === 1}
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <input
                                type="number"
                                id={product._id}
                                className="mx-auto placeholder:text-center my-1 bg-gray-50 w-8 md:w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:px-2.5 py-1"
                                placeholder={product.count}
                                required
                                disabled
                              />
                            </div>
                            <button
                              onClick={() => {
                                handleUpdateCount(
                                  product.product._id,
                                  product.count + 1
                                );
                              }}
                              className="inline-flex items-center justify-center h-6 w-6 p-1 md:ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className=" font-semibold text-gray-900 px-2">
                          {product.price} EGP
                        </td>
                        <td className="px-2">
                          <i
                            className={`md:mx-10 text-xl fa-solid fa-trash-can text-red-600 cursor-pointer ${
                              delClick == product.product._id && "fa-bounce"
                            }`}
                            onClick={() => {
                              handleDeleteProduct(product.product._id);
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
