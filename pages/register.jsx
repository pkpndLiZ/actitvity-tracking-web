import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Register = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (registerData) => {
    console.log("name: ", registerData.name);
    console.log("birthdate: ", registerData.birthdate);
    console.log("gender: ", registerData.gender);
    console.log("email: ", registerData.email);
    console.log("password: ", registerData.password);
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <div className="title">Register</div>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            id="name"
            placeholder="name"
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
          <button type="submit">Submit</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
