import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Validation } from "../utility/validation/ValReg";
import endpoint from "../utility/axios";

export default function UserRegistration() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = Validation(values);
    setErrors((prev) => ({ ...prev, ...Validation(values) }));
    if (error.fullName == "" && error.email == "" && error.password == "") {
      try {
        const res = await endpoint.post("/users", values);
        console.log(res);
          navigate("/userLogin");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(Validation(values));
    }
  };
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section className="bg-gray-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-300">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1>Create and account</h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="fullName" className="label">
                  Name
                </label>
                <input
                  className="inputBox"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  onChange={handleInput}
                />
                {errors.fullName && (
                  <span className="error">{errors.fullName}</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="label">
                  Your email
                </label>
                <input
                  className="inputBox"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  onChange={handleInput}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="password" className="label ">
                  Password
                </label>
                <input
                  className="inputBox"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleInput}
                  autoComplete="off"
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="inputBox"
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-400"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              <button className="btn" type="submit">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
