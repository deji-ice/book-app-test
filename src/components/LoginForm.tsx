import React from "react";

const LoginForm = () => {
  return (
    <form>
      <div>
        <label>Name</label>
        <input type="text" required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
