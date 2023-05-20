import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/src/firebase";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "@firebase/auth";

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = (loginData) => {
    console.log("email: ", loginData.email);
    console.log("password: ", loginData.password);

    setPersistence(getAuth(app), browserSessionPersistence);
    signInWithEmailAndPassword(
      getAuth(app),
      loginData.email,
      loginData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        enqueueSnackbar("Login success.", { variant: "success" });
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("userId", user.uid);
        router.push("/");
        console.log(user);
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
        <div className="login-title">Login</div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit" id="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
