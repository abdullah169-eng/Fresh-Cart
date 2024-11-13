import React, { useState } from "react";
import BrandDetails from "../BrandDetails/BrandDetails";

export default function BrandCard({ brand }) {
  const [showDetails, setShowDetails] = useState(false);
  function handleShowDetails(val) {
    setShowDetails(val);
  }
  return (
    <>
      {showDetails && (
        <section className="fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <article className="bg-white w-11/12 md:w-3/5 relative p-4 text-center">
            <i
              onClick={() => handleShowDetails(false)}
              className="fa-solid fa-circle-xmark text-[#0aad0a] text-3xl cursor-pointer absolute top-2 end-3"
            ></i>
            <BrandDetails id={brand._id} />
          </article>
        </section>
      )}
      <section
        onClick={() => handleShowDetails(true)}
        className="text-center rounded-lg overflow-hidden cursor-pointer transition-all duration-700 hover:scale-110"
      >
        <img src={brand.image} alt={brand.slug} className="w-full" />
        <h3 className="bg-[#0aad0a] bg-opacity-80 text-white text-xl font-semibold p-1">
          {brand.name}
        </h3>
      </section>
    </>
  );
}
