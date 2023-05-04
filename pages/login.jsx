import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (loginData) => {
    console.log("email: ", loginData.email);
    console.log("password: ", loginData.password);
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...register("email")}
          id="email"
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
        />
        <input
          // value={passw
          // onChange={(e) => setPassword(e.target.value)}
          {...register("password", { required: true })}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
