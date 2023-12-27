import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { handleLogin } from "./store/authSlice"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const [passwordType, setPasswordType] = useState("password")

  const initialValues = {
    email: "",
    password: "",
  }

  const handleSubmit = (values) => {
    dispatch(handleLogin(values))
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return
    }
    setPasswordType("password")
  }

  useEffect(() => {
    isAuthenticated && navigate("/")
  }, [isAuthenticated])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="login-box shadow">
          <h2 className="h6">Welcome Back !</h2>
          <h2 className="h7 fw-normal mt-1 text-secondary">Please Sign In</h2>
          <div className="form-group">
            <label className="label">Email</label>
            <Field
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="email" component="div" />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <div className="position-relative">
              <Field
                type={passwordType}
                className="form-control pe-5"
                placeholder="Password"
                name="password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="btn btn-sm position-absolute top-0 end-0"
              >
                {passwordType === "password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-eye-slash hover-text-green"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-eye hover-text-green"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                )}
              </button>
            </div>
            <div style={{ color: "red" }}>
              <ErrorMessage name="password" component="div" />
            </div>
          </div>
          {/* Checkbox and Forgot Password section */}
          <div className="form-group d-flex align-items-center justify-content-between">
            {/* <div className="form-check cursor-pointer">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="rememberMeCheck"
              />
              <label
                className="form-check-label hover-text-green"
                htmlFor="rememberMeCheck"
              >
                Remember Me
              </label>
            </div> */}
            <Link
              to="/forgot-password"
              className="nav-link h7 text-muted hover-text-green"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Submit button */}
          <div className="form-group hover-text-green">
            <button
              className="btn btn-dark d-block w-100 hover-text-green"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading" : "Sign In"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default Login
