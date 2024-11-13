import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function BrandDetails({ id }) {
  // Get Brand Details
  function getBrandDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["brandDetails", id],
    queryFn: getBrandDetails,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <article
        key={data.data.data._id}
        className="flex justify-between items-center"
      >
        <div className="w-1/2 text-start">
          <p className="text-[#0aad0a] font-semibold text-4xl md:text-6xl">
            {data.data.data.name}
          </p>
          <p className="text-lg mt-2 ms-4">{data.data.data.slug}</p>
        </div>
        <div className="w-1/2">
          <img
            src={data.data.data.image}
            alt={data.data.data.slug}
            className="w-full"
          />
        </div>
      </article>
    </>
  );
}
