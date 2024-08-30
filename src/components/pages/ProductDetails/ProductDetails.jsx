import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../sup-pages/Loader/Loader";
import Error from "../../sup-pages/Error/Error";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../../../context/WishContext";
import useWishlist from "../../../customHooks/useWishlist";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function ProductDetails() {
  DocumentTitle("Product");
  const { handleWish } = useWishlist();
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct } = useContext(cartContext);
  const { allWishId, bite } = useContext(wishContext);
  // Adding Product to Cart
  async function handleAdding(id) {
    setIsClicked(true);
    const { resFlag, userMessage } = await addProduct(id);
    if (resFlag) {
      toast.success(userMessage, {
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    } else {
      toast.error(userMessage, {
        duration: 2000,
      });
    }
    setIsClicked(false);
  }
  // Get Product Details
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["productsDetails", id],
    queryFn: getProductDetails,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  const product = data.data.data;
  return (
    <section className="md:flex justify-center items-center px-7 md:px-20 gap-5">
      <article className="md:w-1/3">
        <img src={product.imageCover} alt={product.title} className="w-full" />
      </article>
      <article className="md:w-2/3">
        <section>
          <article className="px-2">
            <h2 className="my-1 text-black text-xl font-medium">
              {product.title}
            </h2>
            <p className="text-gray-500 p-3">{product.description}</p>
            <p className="text-black my-2 font-medium">
              <span>Category : </span>
              <span className="text-green-600">{product.category.name} </span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                <span
                  className={
                    product.priceAfterDiscount
                      ? "line-through text-red-600"
                      : ""
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
            className="bg-[#0aad0a] text-white rounded-lg w-full h-10 font-semibold mt-4"
          >
            {!isClicked ? (
              "Add to Cart"
            ) : (
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
            )}
          </button>
        </section>
      </article>
    </section>
  );
}
