import React from "react";
import amazon from "../../../assets/images/footer/Amazon.png";
import americanExpress from "../../../assets/images/footer/American-Express.png";
import masterCard from "../../../assets/images/footer/Mastercard.png";
import payPal from "../../../assets/images/footer/PayPal.png";
import stores from "../../../assets/images/footer/stores.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 px-5 md:px-20 py-5 mt-5">
      <h2 className="text-2xl font-medium">Get the FreshCart app</h2>
      <p className="text-gray-500 mb-3 mt-1">
        We will send you a link, open it on your phone to download the app.
      </p>
      <div className="md:flex py-2 px-3">
        <input
          type="email"
          id="footerEmail"
          className="w-full md:w-5/6 rounded-md p-2 me-3 my-2"
          placeholder="Email"
        />
        <button
          type="submit"
          className="bg-[#0aad0a] text-white rounded-md p-2 w-full md:w-1/6  my-2"
        >
          Share App Link
        </button>
      </div>
      <article className="md:flex items-center justify-between border-0 border-b-2 border-t-2 my-5 p-3">
        <div className="flex items-center gap-2 my-2">
          <p>Payment Partners</p>
          <img className="w-10 md:w-12" src={amazon} alt="Amazon-Pay" />
          <img
            className="w-10 md:w-12"
            src={americanExpress}
            alt="American-Express"
          />
          <img className="w-10 md:w-12" src={masterCard} alt="Master-Card" />
          <img className="w-10 md:w-12" src={payPal} alt="PayPal" />
        </div>
        <div className="flex items-center gap-2 my-2">
          <p>Get deliveries with FreshCart</p>
          <img className="w-28 md:w-44" src={stores} alt="stores" />
        </div>
      </article>
    </footer>
  );
}
