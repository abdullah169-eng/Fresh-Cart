import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import { cartContext } from "../../../context/CartContext";
import { wishContext } from "../../../context/WishContext";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Login() {
  DocumentTitle("Login");
  const { displayWishlist } = useContext(wishContext);
  const { setToken } = useContext(authContext);
  const { displayCart } = useContext(cartContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Formik
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      setIsClicked(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then(function (res) {
          setIsSuccess(true);
          setIsClicked(false);
          setToken(res.data.token);
          localStorage.setItem("tkn", res.data.token);
          displayCart();
          displayWishlist();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch(function (res) {
          setErrorMessage(res.response.data.message);
          setIsClicked(false);
          setTimeout(() => {
            setErrorMessage(null);
          }, 1000);
        });
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required").email("Invalid Email"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minmum should be 6 characters")
        .max(12, "Maxmum should be 12 characters"),
    }),
  });
  return (
    <section className="my-16">
      <TitleHeader title="Login Now" />
      {isSuccess && (
        <div
          className="w-5/6 md:w-1/2 font-semibold mx-auto text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          Login Completed Successfully
        </div>
      )}
      {errorMessage && (
        <div
          className="w-5/6 md:w-1/2 font-semibold mx-auto text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={loginFormik.handleSubmit}
        className="w-full px-4 md:w-3/4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {loginFormik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {loginFormik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <Link
            to="/forgetPassword"
            className="font-medium text-[#0aad0a] hover:underline"
          >
            Forget your Password ??
          </Link>
        </div>
        <button
          type="submit"
          disabled={isClicked}
          className="bg-[#0aad0a] text-white rounded-lg w-24 h-10 font-semibold mt-3"
        >
          {!isClicked ? (
            "Submit"
          ) : (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          )}
        </button>
      </form>
    </section>
  );
}
