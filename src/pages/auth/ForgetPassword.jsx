import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { handleForgotPassword } from "./store/authSlice"
import { Formik, Form, Field } from "formik"
import { TextInputField } from "../../components/Fields"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
})

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleSubmit = (values) => {
    dispatch(handleForgotPassword(values))
  }

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-box shadow">
            <h2 className="h6"> Forgot Password?</h2>
            <h2 className="h7 mt-1 text-muted">Reset your password</h2>
            <h3 className="text-sm text-start mt-4">
              Enter your email and instructions will be sent to you!
            </h3>
            <div className="form-group">
              <TextInputField
                className="form-control"
                name="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-dark d-block w-100 hover-text-green"
                disabled={loading}
              >
                {loading ? "Loading" : "Send Reset Link"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-muted h7 text-center mt-3 mb-0">
        Wait, I remember my password...
        <Link
          to="/login"
          className="text-black ms-1 fw-semibold hover-text-green"
        >
          Click here
        </Link>
      </p>
    </>
  )
}

export default ForgetPassword
