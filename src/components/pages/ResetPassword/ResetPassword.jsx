import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function ResetPassword() {
  DocumentTitle("Forget Password");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // Formik
  const resetFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: function (values) {
      setIsClicked(true);
      axios
        .put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        )
        .then(function (res) {
          setIsSuccess(res.data.token);
          setIsClicked(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch(function (error) {
          setErrorMessage(error.response.data.message);
          setIsClicked(false);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required").email("Invalid Email"),
      newPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Minmum should be 6 characters")
        .max(12, "Maxmum should be 12 characters"),
    }),
  });
  return (
    <section className="my-5">
      <TitleHeader title="Forget Password" />
      {/* <!-- Progress Stepper --> */}
      <ol className="flex items-center text-sm text-gray-500 font-medium sm:text-base w-full px-2 md:w-3/4 mx-auto my-10">
        <li className="flex md:w-full items-center text-[#0aad0a] sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-[#0aad0a] after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2">
            <span className="w-6 h-6 bg-[#0aad0a] border border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
              <i className="fa-solid fa-check md:text-xl"></i>
            </span>{" "}
            Forgrt Password
          </div>
        </li>
        <li className="flex md:w-full items-center text-[#0aad0a] sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-[#0aad0a] after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2">
            <span className="w-6 h-6 bg-[#0aad0a] border border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
              <i className="fa-solid fa-check md:text-xl"></i>
            </span>{" "}
            Verifiying
          </div>
        </li>
        <li className="flex md:w-full items-center text-[#0aad0a]">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-[#0aad0a] border border-[#0aad0a] rounded-full flex justify-center items-center mr-3 text-white lg:w-10 lg:h-10">
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
          Password reseted Successfully
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
        Please enter your Email and New-Password :
      </p>
      <form
        onSubmit={resetFormik.handleSubmit}
        className="w-full px-4 md:w-3/4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={resetFormik.values.email}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
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
          {resetFormik.errors.email && resetFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {resetFormik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={resetFormik.values.newPassword}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
            type="password"
            name="newPassword"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New-Password
          </label>
          {resetFormik.errors.newPassword && resetFormik.touched.newPassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {resetFormik.errors.newPassword}
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
