import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiCircleAlert } from "react-icons/ci";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import endpoint from "../utility/axios";

export default function UserRegistration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await endpoint.post("/users", data);
      console.log(res.data);
      navigate("/userLogin");
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Join Now and Get 50% off</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id="create-user">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  {...register("fullName", { required: true })}
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName?.type === "required" && (
                  <Alert variant="destructive">
                    <CiCircleAlert />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      user name should not be empty
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type={"email"}
                  id="email"
                  placeholder="hello@email.com"
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="*********"
                  {...register("password")}
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" form="create-user">
            Create
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
