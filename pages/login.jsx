import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (loginData) => {
    console.log("email: ", loginData.email);
    console.log("password: ", loginData.password);
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
