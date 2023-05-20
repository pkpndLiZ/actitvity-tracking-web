import { app } from "@/src/firebase";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Link from "next/link";

export default function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = (registerData) => {
    const user = {
      email: registerData.email,
      password: registerData.password,
    };

    createUserWithEmailAndPassword(
      getAuth(app),
      registerData.email,
      registerData.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        enqueueSnackbar("Register success.", { variant: "success" });
        router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <div className="register-title">Register</div>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="email@email.com"
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            placeholder="********"
            type="password"
          />
          <button type="submit" role="button" id="submit">
            Submit
          </button>
        </form>
        <div className="flex gap-4 justify-center">
          <p className="text-purple-400">Already have an account?</p>
          <Link
            className="text-white hover:text-purple-700 duration-500"
            href="/login"
          >
            Login here.
          </Link>
        </div>
      </div>
    </div>
  );
}
