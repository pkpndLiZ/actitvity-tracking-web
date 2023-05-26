import { app } from "@/src/firebase";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import React, { useContext, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { axiosInstance } from "../src/axiosInstance";
import registerImg from "../public/images/registerImg.png";
import Image from "next/image";
import { mutate } from "swr";
import { UserContext } from "@/src/userContext";

export default function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (registerData) => {
    try {
      const { email, password } = registerData;

      const userCredential = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );

      const user = userCredential.user;
      const { uid } = user;

      // console.log(user);

      const userInfo = {
        userId: uid,
        email: email,
        username: uid.slice(0, 4),
      };

      axiosInstance
        .post("api/users", userInfo, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then(async (response) => {
          setSuccess(true);
          // console.log("response: ", response);
          enqueueSnackbar("Register success.", { variant: "success" });
          router.push("/login");
        })
        .catch((error) => {
          console.log("error: " + error.message);
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
      // console.log(errorCode, errorMessage);
      enqueueSnackbar(`Register failed: ${errorMessage}`, { variant: "error" });
    }
  };

  return (
    <div className="bg-[#19191a] h-screen fixed inset-0 flex items-center justify-center">
      <div className="w-9/12 flex shadow-xl shadow-black rounded-md">
        <div className="w-7/12 rounded-md md:object-none">
          <Image className="h-full" src={registerImg} alt="loginImg" />
        </div>
        <div className="w-5/12 bg-[#282829] rounded-md">
          <form
            className="text-white py-4 px-12 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-white py-8 text-4xl font-bold">Register</h2>
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
              REGISTER
            </button>
            <p className="text-center py-4">Already have an account ?</p>
            <Link href="/login">
              <button className="w-full bg-violet-700 py-2 rounded-md shadow-sm shadow-black font-bold hover:bg-violet-500 hover:text-violet-900 duration-300 mb-[53px]">
                LOGIN
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
