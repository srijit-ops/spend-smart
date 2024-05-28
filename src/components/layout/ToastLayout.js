"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastLayout({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
