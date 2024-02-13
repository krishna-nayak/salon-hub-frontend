import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Validation } from "../utility/validation/ValLogin.js";
import endpoint from "../utility/axios/index.js";

export default function UserLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = Validation(values);
    setErrors((prev) => ({ ...prev, ...Validation(values) }));
    if (error.email == "" && error.password == "") {
      try {
        const res = await endpoint.post("/login", values);
        console.log(res);
        navigate("/");
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
            <h1>Sign in to your account</h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              action="#"
            >
              <div>
                <label htmlFor="email" className=" label">
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
                {errors.email && (
                  <span className="text-red-600">{errors.email}</span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  className="inputBox"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="off"
                  onChange={handleInput}
                />
                {errors.password && (
                  <span className="text-red-600">{errors.password}</span>
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
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/userRegistration"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
