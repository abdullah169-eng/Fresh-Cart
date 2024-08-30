import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './../sup-pages/Navbar/Navbar';
import Footer from './../sup-pages/Footer/Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-20"><Outlet /></div>
      <Footer />
    </>
  );
}
