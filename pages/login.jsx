import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/src/firebase";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import exerciseImage from "../public/images/loginImg.jpg";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import Image from "next/image";
import Link from "next/link";

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = (loginData) => {
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
    <div className="bg-[#19191a] h-screen fixed inset-0 flex items-center justify-center">
      <div className="w-9/12 flex shadow-xl shadow-black rounded-md">
        <div className="w-7/12 rounded-md md:object-none">
          <Image src={exerciseImage} alt="loginImg" />
        </div>
        <div className="w-5/12 bg-[#282829] rounded-md">
          <form
            className="text-white py-4 px-12 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-white py-8 text-4xl font-bold">Login</h2>
            <label className="text-md font-bold py-2">Email Address</label>
            <input
              className="h-[45px] rounded-md pl-2 text-black border border-violet-700"
              {...register("email")}
              id="email"
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
            />
            <label className="text-md font-bold py-2">Password</label>
            <input
              className="h-[45px] rounded-md pl-2 text-black border border-violet-700"
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
            />
            <button
              className="w-full bg-violet-700 py-2 mt-12 rounded-md shadow-sm shadow-black font-bold hover:bg-violet-500 hover:text-violet-900 duration-300"
              type="submit"
            >
              LOGIN
            </button>
            <p className="text-center py-4">Or</p>
            <Link href="/register">
              <button className="w-full bg-violet-700 py-2 rounded-md shadow-sm shadow-black font-bold hover:bg-violet-500 hover:text-violet-900 duration-300">
                REGISTER
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
