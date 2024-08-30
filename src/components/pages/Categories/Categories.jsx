import React from "react";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import CategoryCard from "./../../sup-pages/CategoryCard/CategoryCard";
import Loader from "../../sup-pages/Loader/Loader";
import Error from "../../sup-pages/Error/Error";
import useAllCategories from "../../../customHooks/useAllCategories";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Categories() {
  DocumentTitle("Categories");
  const { data, isError, isLoading } = useAllCategories();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <TitleHeader title="Categories" />
      <section className="px-10 my-8 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.data.data.map((card) => {
          return <CategoryCard key={card._id} card={card} />;
        })}
      </section>
    </>
  );
}
