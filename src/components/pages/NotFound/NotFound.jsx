import React from "react";
import error from "../../../assets/images/error.svg";

export default function NotFound() {
  return (
    <section className="p-3">
      <img className="mx-auto" src={error} alt="error" />
    </section>
  );
}
