import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import { cartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Payment() {
  DocumentTitle("Payment");
  const { cartId, updateUI } = useContext(cartContext);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedOnline, setIsClickedOnline] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  // Handle Payment
  function handlePayment(values) {
    if (isOnline) {
      onlinePayment(values);
    } else {
      cashPayment(values);
    }
  }
  // Cash Payment
  function cashPayment(values) {
    setIsClicked(true);
    const backendShape = {
      shippingAddress: values,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendShape,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then(function (res) {
        updateUI();
        setIsClicked(false);
        toast.success(res.data.status, {
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      })
      .catch(function (error) {
        setIsClicked(false);
        toast.error(error.response.data.message, {
          duration: 2000,
        });
      });
  }
  // Online Payment
  function onlinePayment(values) {
    setIsClickedOnline(true);
    const backendShape = {
      shippingAddress: values,
    };
    const redirectUrl = encodeURIComponent(
      "https://abdullah169-eng.github.io/Fresh-Cart/#"
    );
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`,
        backendShape,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then(function (res) {
        window.open(res.data.session.url, "_self");
        setIsClickedOnline(false);
      })
      .catch(function () {
        setIsClickedOnline(false);
        toast.error("Invaild ID, Please Login", {
          duration: 2000,
        });
      });
  }
  // Formik
  const cashFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlePayment,
  });
  return (
    <section className="my-5">
      <TitleHeader title="Payment Details" />
      <form
        onSubmit={cashFormik.handleSubmit}
        className="w-full px-4 md:w-3/4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={cashFormik.values.details}
            onChange={cashFormik.handleChange}
            onBlur={cashFormik.handleBlur}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={cashFormik.values.phone}
            onChange={cashFormik.handleChange}
            onBlur={cashFormik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={cashFormik.values.city}
            onChange={cashFormik.handleChange}
            onBlur={cashFormik.handleBlur}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>
        <button
          type="submit"
          onClick={() => setIsOnline(false)}
          disabled={isClicked}
          className="bg-[#0aad0a] text-white rounded-lg p-2 font-semibold mt-2"
        >
          {!isClicked ? (
            "Cash Payment"
          ) : (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          )}
        </button>
        <button
          type="submit"
          onClick={() => setIsOnline(true)}
          disabled={isClicked}
          className="bg-[#0aad0a] text-white rounded-lg p-2 font-semibold mt-2 ms-3"
        >
          {!isClickedOnline ? (
            "Online Payment"
          ) : (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          )}
        </button>
      </form>
    </section>
  );
}
