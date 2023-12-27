import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleResetPassword, gotoLogin } from "./store/authSlice";
import { Formik, Form, Field } from "formik";
import { TextInputField } from "../../components/Fields";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  let { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, passwordUpdated } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    let obj = {
      ...values,
    };
    obj.token = token ?? "";
    delete obj.confirm_password;
    dispatch(handleResetPassword(obj));
  };

  useEffect(() => {
    if (passwordUpdated) navigate("/login");
    dispatch(gotoLogin());
  }, [passwordUpdated]);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", confirm_password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="login-box shadow">
          <h2 className="h6"> Reset Password</h2>
          <div className="form-group">
            <TextInputField
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <TextInputField
              name="password"
              label="Create New Password"
              placeholder="Enter New Password"
            />
          </div>
          <div className="form-group">
            <TextInputField
              name="confirm_password"
              label="Confirm your Password"
              placeholder="Confirm Your New Password"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-dark d-block w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading" : "Reset Password"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ResetPassword;
