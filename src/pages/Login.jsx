import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../utility/validation/ValLogin.js";
import endpoint from "../utility/axios/index.js";
import { CiCircleAlert } from "react-icons/ci";
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
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
export default function UserLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await endpoint.post("/login", data);
      toast("Welcome to SALON_HUB 🙏");
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Error occured while logging 😳");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex  h-screen justify-center items-center">
      <form className="" onSubmit={handleSubmit(onSubmit)} action="#">
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <Alert variant="destructive">
                    <CiCircleAlert />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
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
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                  })}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <CiCircleAlert />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errors.password.message}
                    </AlertDescription>
                  </Alert>
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
