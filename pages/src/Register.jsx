import React, { useState } from "react";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  // name / birthdate / gender / email / password / submit

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* name */}
        <label htmlFor="name">name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="name"
        />
        {/* birthdate */}
        <label htmlFor="birthdate">birthdate</label>
        <input
          value={birthdate}
          name="birthdate"
          onChange={(e) => setBirthdate(e.target.value)}
          id="birthdate"
          placeholder="birthdate"
        />
        {/* gender */}
        <label htmlFor="gender">gender</label>
        <input
          value={gender}
          name="gender"
          onChange={(e) => setGender(e.target.value)}
          id="gender"
          placeholder="gender"
        />
        {/* email */}
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@email.com"
          id="email"
          name="email"
        />
        {/* password */}
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
