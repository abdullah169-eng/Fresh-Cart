import React, { useState } from "react";
import CategoryDetails from "../CategoryDetails/CategoryDetails";

export default function CategoryCard({ card }) {
  const [showDetails, setShowDetails] = useState(false);
  function handleShowDetails(val) {
    setShowDetails(val);
  }
  return (
    <>
      {showDetails && (
        <section className="fixed top-0 start-0 end-0 bottom-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <article className="bg-white w-4/5 relative p-4 text-center">
            <i
              onClick={() => handleShowDetails(false)}
              className="fa-solid fa-circle-xmark text-[#0aad0a] text-3xl cursor-pointer absolute top-2 end-3"
            ></i>
            <h2 className="text-[#0aad0a] text-2xl md:text-4xl font-semibold px-3">
              {card.name + " Subcategories"}
            </h2>
            <CategoryDetails id={card._id} />
          </article>
        </section>
      )}
      <section
        onClick={() => handleShowDetails(true)}
        className="text-center rounded-lg overflow-hidden cursor-pointer transition-all duration-700 hover:scale-110"
      >
        <img
          src={card.image}
          alt={card.slug}
          className="w-full h-72 hover:scale-100"
        />
        <h3 className="bg-[#0aad0a] bg-opacity-80 text-white text-xl font-semibold py-2">
          {card.name}
        </h3>
      </section>
    </>
  );
}
