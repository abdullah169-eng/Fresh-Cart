import React from "react";

export default function TitleHeader({ title }) {
  return (
    <article>
      <h1 className="text-[#0aad0a] text-3xl md:text-5xl uppercase font-bold text-center">
        {title}
      </h1>
      <div className="flex gap-2 my-4 items-center justify-center">
        <div className="bg-[#0aad0a] my-1 w-20 h-1"></div>
        <i className="fa-solid fa-star text-[#0aad0a]"></i>
        <div className="bg-[#0aad0a] my-1 w-20 h-1"></div>
      </div>
    </article>
  );
}
