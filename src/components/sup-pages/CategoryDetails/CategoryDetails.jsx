import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function CategoryDetails({ id }) {
  // Get Category Details
  function getCategoryDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["categoryDetails", id],
    queryFn: getCategoryDetails,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 px-3 text-center mb-5 mt-7">
        {data.data.data.map((cat) => {
          return (
            <article
              key={cat._id}
              className="p-2 rounded-lg font-semibold text-2xl border-2 border-green-500"
            >
              <span>{cat.name}</span>
            </article>
          );
        })}
      </section>
    </>
  );
}
