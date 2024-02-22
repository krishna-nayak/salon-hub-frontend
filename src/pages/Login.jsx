import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Validation } from "../utility/validation/ValLogin.js";
import endpoint from "../utility/axios/index.js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="flex  h-screen justify-center items-center">
      <form className="" onSubmit={handleSubmit} action="#">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Signin to book an appointment now !!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Your email</Label>
                <Input
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
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
            </div>
          </CardContent>
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-4 px-2">
              <Checkbox id="terms2" />

              <CardDescription> Accept terms and conditions</CardDescription>
            </div>
          </div>
          <CardFooter className="mt-4 flex justify-center">
            <Button className="w-full">Sign In</Button>
          </CardFooter>

          <p className="text-sm px-4 justify-center font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to={"/userRegistration"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </form>
    </div>
  );
}
