import { app } from "@/src/firebase";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export default function Register(props) {
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = (registerData) => {
    const user = {
      email: registerData.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      birthDate: registerData.birthDate,
      gender: registerData.gender,
      city: registerData.city,
      height: registerData.height,
      weight: registerData.weight,
      profileName: registerData.profileName,
      profileImage: registerData.profileImage,
    };
    // console.log("agreement: ", registerData.agreement);

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
          <label htmlFor="firstName" id="firstName">
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            placeholder="first name"
            type="text"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName")}
            id="lastName"
            placeholder="last name"
            type="text"
          />
          <label htmlFor="birthdate">Birthdate</label>
          <input
            {...register("birthdate")}
            id="birthdate"
            placeholder="birthdate"
            type="date"
          />
          <label htmlFor="gender">Gender</label>
          <input
            {...register("gender")}
            id="gender"
            placeholder="gender"
            type="text"
          />
          <label htmlFor="city">City</label>
          <input
            {...register("city")}
            id="city"
            placeholder="city"
            type="text"
          />
          <label htmlFor="height">Height (cm)</label>
          <input
            {...register("height")}
            id="height"
            placeholder="height"
            type="text"
          />
          <label htmlFor="weight">Weight (kg)</label>
          <input
            {...register("weight")}
            id="weight"
            placeholder="weight"
            type="text"
          />

          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            placeholder="email@email.com"
            id="email"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            placeholder="********"
            type="password"
          />
          <div id="data-agreement">
            <p>Do you allow us to use your data?</p>
            <input
              {...register("agreement")}
              type="checkbox"
              id="data-agreement"
            />
            <label htmlFor="data-agreement" id="data-agreement">
              &nbsp;Yes, I do.
              <span>
                &nbsp;Read
                <span>
                  <a href="#"> the agreement.</a>
                </span>
              </span>
            </label>
          </div>
          <button type="submit" role="button" id="submit">
            Submit
          </button>
        </form>
        <button className="link-btn">
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
}
