import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Register = (props) => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [name, setName] = useState("");
  // const [birthdate, setBirthdate] = useState("");
  // const [gender, setGender] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (registerData) => {
    console.log("email: ", registerData.email);
    console.log("password: ", registerData.password);
    console.log("name: ", registerData.name);
    console.log("birthdate: ", registerData.birthdate);
    console.log("gender: ", registerData.gender);
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <label htmlFor="name">Name</label>
        <input
          // value={name}
          // name="name"
          // onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="name"
        />
        {/* birthdate */}
        <label htmlFor="birthdate">Birthdate</label>
        <input
          // value={birthdate}
          // name="birthdate"
          // onChange={(e) => setBirthdate(e.target.value)}
          id="birthdate"
          placeholder="birthdate"
        />
        {/* gender */}
        <label htmlFor="gender">Gender</label>
        <input
          // value={gender}
          // name="gender"
          // onChange={(e) => setGender(e.target.value)}
          id="gender"
          placeholder="gender"
        />
        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@email.com"
          id="email"
          // name="email"
        />
        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          // value={password}
          // onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          // name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
