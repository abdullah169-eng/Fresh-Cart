import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../sup-pages/TitleHeader/TitleHeader";
import DocumentTitle from "../../sup-pages/DocumentTitle/DocumentTitle";

export default function Register() {
  DocumentTitle("registration");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // Formik
  const registFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: function (values) {
      setIsClicked(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then(function () {
          setIsSuccess(true);
          setIsClicked(false);
          setTimeout(() => {
            navigate("/login");
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
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Minmum should be 3 characters")
        .max(12, "Maxmum should be 12 characters"),
      email: yup.string().required("Email is required").email("Invalid Email"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minmum should be 6 characters")
        .max(12, "Maxmum should be 12 characters"),
      rePassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/),
    }),
  });
  return (
    <section>
      <TitleHeader title="Register Now" />
      {isSuccess && (
        <div
          className="w-5/6 md:w-1/2 font-semibold mx-auto text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          Registration Completed Successfully
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
        onSubmit={registFormik.handleSubmit}
        className="w-full px-4 md:w-3/4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={registFormik.values.name}
            onChange={registFormik.handleChange}
            onBlur={registFormik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {registFormik.errors.name && registFormik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {registFormik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={registFormik.values.email}
            onChange={registFormik.handleChange}
            onBlur={registFormik.handleBlur}
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
          {registFormik.errors.email && registFormik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {registFormik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={registFormik.values.password}
            onChange={registFormik.handleChange}
            onBlur={registFormik.handleBlur}
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
          {registFormik.errors.password && registFormik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {registFormik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={registFormik.values.rePassword}
            onChange={registFormik.handleChange}
            onBlur={registFormik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {registFormik.errors.rePassword && registFormik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {registFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={registFormik.values.phone}
            onChange={registFormik.handleChange}
            onBlur={registFormik.handleBlur}
            type="text"
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
          {registFormik.errors.phone && registFormik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {registFormik.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          disabled={isClicked}
          className="bg-[#0aad0a] text-white rounded-lg w-24 h-10 font-semibold"
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
