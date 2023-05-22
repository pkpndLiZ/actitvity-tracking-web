import { app } from "@/src/firebase";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import React, { useContext, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { axiosInstance } from "../src/axiosInstance";
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

      console.log(user);

      const userInfo = {
        userId: uid,
        email: email,
        username: uid,
      };

      axiosInstance
        .post("api/users", userInfo, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then(async (response) => {
          setSuccess(true);
          console.log("response: ", response);
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
      console.log(errorCode, errorMessage);
      enqueueSnackbar(`Register failed: ${errorMessage}`, { variant: "error" });
    }
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
