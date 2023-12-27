import React, { useEffect, useState } from "react"
import bg_image from "../../assets/images/car-bg.webp"
import logo from "./../../assets/images/logo-white.png"
import { Navigate } from "react-router-dom"

const NonAuthLayout = ({ children }) => {
  let token = sessionStorage.getItem("accessToken")

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <main className="login-wrapper">
        <div className="login-bg-wrapper">
          <img
            src={bg_image}
            // fill
            alt="bg image"
            className="bg-image vertical-align-middle"
          />
          <span className="bg-overlay"></span>
          <div className="login-bg-shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120"
              fill="#fff"
              className="vertical-align-middle"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
            </svg>
          </div>
        </div>
        <div className="login-box-wrapper">
          <div className="my-4 text-center">
            <img
              alt="logo"
              src={logo}
              width={500}
              height={120}
              className="object-fit-contain logo-img pt-3"
            />
            <p className="m-0 mt-2 text-sm fw-normal text-white-50">
              Live the Exceptional with Soul
            </p>
          </div>
          {children}
        </div>
      </main>
    </>
  )
}

export default NonAuthLayout
