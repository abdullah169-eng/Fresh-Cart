import React, { useState } from "react";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import ProductCard from "../../sup-pages/ProductCard/ProductCard";
import Loader from "../../sup-pages/Loader/Loader";
import Error from "../../sup-pages/Error/Error";
import axios from "axios";
import { useQuery } from "react-query";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Products() {
  DocumentTitle("Products");
  const [search, setSearch] = useState("");
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllProducts,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <TitleHeader title="Products" />
      <article className="w-5/6 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onInput={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="search"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Search...
          </label>
        </div>
      </article>
      <section className="px-10 grid md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-6 min-h-96">
        {data.data.data
          .filter((product) => {
            return search.toLowerCase() === ""
              ? product
              : product.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </section>
    </>
  );
}
