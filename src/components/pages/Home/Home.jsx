import React from "react";
import MainSlider from "../../sup-pages/MainSlider/MainSlider";
import CategorySlider from "../../sup-pages/CategorySlider/CategorySlider";
import DocumentTitle from "./../../sup-pages/DocumentTitle/DocumentTitle";

export default function Home() {
  DocumentTitle("Fresh-Cart");
  return (
    <section className="px-5">
      <article className="w-full mb-10">
        <MainSlider />
      </article>
      <article className="my-20 px-2">
        <h3 className="font-semibold text-2xl mb-5">Shop Popular Categories</h3>
        <CategorySlider />
      </article>
    </section>
  );
}
