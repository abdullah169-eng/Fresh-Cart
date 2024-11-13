import React from "react";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import BrandCard from "../../sup-pages/BrandCard/BrandCard";
import Loader from "../../sup-pages/Loader/Loader";
import Error from "../../sup-pages/Error/Error";
import axios from "axios";
import { useQuery } from "react-query";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Brands() {
  DocumentTitle("Brands");
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "allBrands",
    queryFn: getAllBrands,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <TitleHeader title="Brands" />
      {data.data.data.length == 0 ? (
        <section className="flex justify-center items-center p-5 h-[35vh]">
          <div className="text-[#0aad0a] text-center">
            <h1 className="text-5xl font-semibold my-5">No Brands to show</h1>
          </div>
        </section>
      ) : (
        <section className="px-10 grid md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {data.data.data.map((brand) => {
            return <BrandCard key={brand._id} brand={brand} />;
          })}
        </section>
      )}
    </>
  );
}
