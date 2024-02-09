import React, { useState } from "react";
import { Validation } from "../utility/validation/ValReg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/ui/InputBox";
import Buttons from "../components/ui/Buttons";
export default function UserRegistration() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = Validation(values);
    setErrors((prev) => ({ ...prev, ...Validation(values) }));
    if (error.fullName == "" && error.email == "" && error.password == "") {
      axios
        .post("http://localhost:3000/users", values)
        .then((res) => {
          navigate("/userLogin");
          console.log(res);
        })

        .catch((err) => console.log(err));
    } else {
      console.log(Validation(values));
      //console.log("Validation not atching");
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <InputBox
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  onChange={handleInput}
                />
                {errors.fullName && (
                  <span className="text-red-600">{errors.fullName}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <InputBox
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  onChange={handleInput}
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <InputBox
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleInput}
                  autoComplete="off"
                />
                {errors.password && (
                  <span className="text-red-600">{errors.password}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <InputBox
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
              <Buttons type="submit">Sign in</Buttons>
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
