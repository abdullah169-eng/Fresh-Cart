import React, { useState } from "react";
import Error from "../../sup-pages/Error/Error";
import Loader from "../../sup-pages/Loader/Loader";
import { useQuery } from "react-query";
import axios from "axios";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import { jwtDecode } from "jwt-decode";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Orders() {
  DocumentTitle("Orders");
  const [viewProducts, setViewProducts] = useState(false);
  const [products, setProducts] = useState(null);
  const userId = jwtDecode(localStorage.getItem("tkn")).id;
  function getOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "allOrders",
    queryFn: getOrders,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  // View Products
  function view(id) {
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].id == id) {
        setProducts(data.data[i].cartItems);
        setViewProducts(true);
      }
    }
  }

  return (
    <>
      <TitleHeader title="All Orders" />
      <section className="px-1 md:px-5 py-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#0aad0a]">
              <tr className="text-center">
                <th scope="col" className="py-3">
                  Date
                </th>
                <th scope="col" className="py-3">
                  Order Price
                </th>
                <th scope="col" className="py-3">
                  payment Method
                </th>
                <th scope="col" className="py-3">
                  Address
                </th>
                <th scope="col" className="py-3">
                  City
                </th>
                <th scope="col" className="py-3">
                  Order's Products
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((order) => {
                return (
                  <tr
                    key={order.id}
                    className="text-center bg-white border-b hover:bg-gray-50"
                  >
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      {order.createdAt
                        .substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </td>
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      {order.totalOrderPrice} <span className="ms-1">EGP</span>
                    </td>
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      {order.paymentMethodType}
                    </td>
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      {order.shippingAddress.details}
                    </td>
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      {order.shippingAddress.city}
                    </td>
                    <td className="font-semibold text-gray-900 py-6 text-sm md:text-base">
                      <a
                        onClick={() => view(order.id)}
                        className="font-medium text-[#0aad0a] cursor-pointer hover:underline"
                      >
                        View Products
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* View Products */}
      {viewProducts ? (
        <section className="fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <article className="bg-white w-11/12 relative p-4 text-center">
            <i
              onClick={() => setViewProducts(false)}
              className="fa-solid fa-circle-xmark text-[#0aad0a] text-3xl cursor-pointer absolute top-2 end-3"
            ></i>
            <h2 className="text-[#0aad0a] text-2xl md:text-4xl font-semibold px-3 mb-6">
              Order's Products
            </h2>
            <section className="md:px-10 grid md:grid-cols-3 gap-5 max-h-[80vh] overflow-y-scroll md:overflow-auto">
              {products.map((product) => {
                return (
                  <section
                    key={product.product._id}
                    className="border-2 border-[#0aad0a] px-2"
                  >
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="h-24 w-24 md:h-32 md:w-32 mx-auto"
                    />
                    <article className="px-2">
                      <h2 className="my-1 text-black text-lg font-medium">
                        {"Name : " +
                          product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                      </h2>
                      <h4 className="text-green-600 mt-2">
                        {"Category : " + product.product.category.name}
                      </h4>
                      <h2 className="my-1 text-black text-lg font-medium">
                        {"Number of Pieces : " + product.count}
                      </h2>
                    </article>
                  </section>
                );
              })}
            </section>
          </article>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
