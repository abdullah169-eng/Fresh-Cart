import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function ForgetPassword() {
  DocumentTitle("Forget Password");
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // Formik
  const forgetFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: function (values) {
      setIsClicked(true);
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        )
        .then(function (res) {
          setIsSuccess(res.data.message);
          setIsClicked(false);
          setTimeout(() => {
            navigate("/vertificationCode");
          }, 2000);
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          setErrorMessage(
            error.response.data.message.split(" ").slice(0, 8).join(" ")
          );
          setIsClicked(false);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required").email("Invalid Email"),
    }),
  });
  return (
    <section className="my-5">
      <TitleHeader title="Forget Password" />
      {/* <!-- Progress Stepper --> */}
      <ol className="flex items-center text-sm text-gray-500 font-medium sm:text-base w-full px-2 md:w-3/4 mx-auto my-10">
        <li className="flex md:w-full items-center text-[#0aad0a] sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
            <span className="w-6 h-6 bg-[#0aad0a] border border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
              1
            </span>{" "}
            Forgrt Password
          </div>
        </li>
        <li className="flex md:w-full items-center text-gray-600 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
            <span className="w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10">
              2
            </span>{" "}
            Verifiying
          </div>
        </li>
        <li className="flex md:w-full items-center text-gray-600 ">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10">
              3
            </span>{" "}
            Reset Password
          </div>
        </li>
      </ol>
      {isSuccess && (
        <div
          className="w-5/6 md:w-1/2 font-semibold mx-auto text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          {isSuccess}
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
      <p className="w-full px-4 md:w-3/4 mx-auto font-semibold text-lg my-5">
        Please enter your email to send the verification code :
      </p>
      <form
        onSubmit={forgetFormik.handleSubmit}
        className="w-full px-4 md:w-3/4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={forgetFormik.values.email}
            onChange={forgetFormik.handleChange}
            onBlur={forgetFormik.handleBlur}
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
          {forgetFormik.errors.email && forgetFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {forgetFormik.errors.email}
            </div>
          ) : (
            ""
          )}
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
