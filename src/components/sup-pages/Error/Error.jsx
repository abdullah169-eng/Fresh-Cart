import React from "react";

export default function Error() {
  return (
    <section className="flex justify-center items-center p-5 h-[80vh]">
      <div className="text-[#0aad0a] text-center">
        <i className="fa-solid fa-triangle-exclamation text-9xl"></i>
        <h1 className="text-5xl font-semibold my-5">Something went wrong</h1>
        <h1 className="text-lg text-black">
          page could not be loaded. Please try again later
        </h1>
      </div>
    </section>
  );
}
