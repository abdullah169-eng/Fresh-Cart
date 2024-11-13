import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/freshcart-logo.svg";
import { authContext } from "../../../context/AuthContext";
import { cartContext } from "../../../context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  // Responsive Nav
  const [open, isOpen] = useState(false);
  function getLinks() {
    if (open == true) {
      isOpen(false);
    } else {
      isOpen(true);
    }
  }
  // Logout
  function logOut() {
    localStorage.removeItem("tkn");
    localStorage.removeItem("owner");
    setToken(null);
    navigate("/");
  }
  return (
    <nav className="h-16 fixed w-full bg-gray-100 z-50">
      <section className="w-full md:w-5/6 mx-auto flex items-center justify-between h-full px-2 md:px-0">
        <article className="flex items-center">
          {token && (
            <button onClick={getLinks} className="p-2 md:hidden">
              <i className="fa-solid fa-bars text-3xl"></i>
            </button>
          )}
          <Link to="/">
            <img src={logo} alt="freshCart-logo" />
          </Link>
          {token && (
            <ul className="hidden md:flex gap-4 ms-5 text-gray-500">
              <li>
                <NavLink to="/">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Home
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/products">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Products
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Categories
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Brands
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a] bg-transparent">
                    Wishlist
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a] bg-transparent">
                    Cart
                  </p>
                </NavLink>
              </li>
            </ul>
          )}
        </article>
        <article className="flex items-center">
          <div className="text-gray-500 ms-5 flex gap-x-2">
            {token ? (
              <>
                <NavLink to="/cart">
                  <div className="relative cursor-pointer">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    <div className="absolute top-[-12px] end-[-5px] bg-[#0aad0a] text-white font-semibold px-1 rounded-md">
                      {cartItems}
                    </div>
                  </div>
                </NavLink>
                <span
                  onClick={logOut}
                  className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a] cursor-pointer"
                >
                  SignOut
                </span>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Login
                  </p>
                </NavLink>
                <NavLink to="/register">
                  <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                    Register
                  </p>
                </NavLink>
              </>
            )}
          </div>
        </article>
      </section>
      {/* small screen */}
      {token && (
        <section
          id="mobile"
          className={`md:hidden overflow-hidden bg-gray-100 transition-all duration-700 ${
            open ? "h-64" : "h-0"
          }`}
        >
          <ul className="flex flex-col md:hidden gap-y-2 px-4 py-2">
            <li>
              <NavLink to="/" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                  Home
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                  Products
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                  Categories
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a]">
                  Brands
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a] bg-transparent">
                  Wishlist
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={getLinks}>
                <p className="px-2 py-1 rounded-md hover:text-white hover:bg-[#0aad0a] bg-transparent">
                  Cart
                </p>
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </nav>
  );
}
