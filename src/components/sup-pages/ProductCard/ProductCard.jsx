import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../../../context/WishContext";
import useWishlist from "../../../customHooks/useWishlist";

export default function ProductCard({ product }) {
  const [isClicked, setIsClicked] = useState(false);
  const { addProduct } = useContext(cartContext);
  const { allWishId, bite } = useContext(wishContext);
  const { handleWish } = useWishlist();
  // Adding Product to Cart
  async function handleAdding(id) {
    setIsClicked(true);
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
    setIsClicked(false);
  }
  return (
    <section className="relative">
      {product.priceAfterDiscount && (
        <div className="bg-red-600 absolute top-1 end-1 px-3 py-1 text-white rounded-lg">
          Sale
        </div>
      )}
      <Link to={`/productDetails/${product._id}`}>
        <img src={product.imageCover} alt={product.title} className="w-full" />
        <article className="px-2">
          <h4 className="text-green-600 mt-2">{product.category.name}</h4>
          <h2 className="my-1 text-black text-lg font-medium">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              <span
                className={
                  product.priceAfterDiscount ? "line-through text-red-600" : ""
                }
              >
                {product.price}
              </span>
              <span className="mx-1">{product.priceAfterDiscount}</span>
              EGP
            </p>
            <p>
              <span>{product.ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-400 ms-1"></i>
            </p>
          </div>
        </article>
      </Link>
      <div className="px-4">
        <i
          onClick={() => handleWish(product._id)}
          className={`fa-solid fa-heart text-3xl cursor-pointer ${
            allWishId?.includes(product._id) ? "text-red-600" : "text-black"
          } ${bite == product._id ? "fa-beat" : ""}`}
        ></i>
      </div>
      <button
        type="submit"
        disabled={isClicked}
        onClick={() => handleAdding(product._id)}
        className="bg-[#0aad0a] text-white rounded-lg h-10 font-semibold mt-2 w-full"
      >
        {!isClicked ? (
          "Add to Cart"
        ) : (
          <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
        )}
      </button>
    </section>
  );
}
