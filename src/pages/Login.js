import React from "react";

function Login() {
  const googleURL = `${process.env.REACT_APP_BACKEND_HOST}/auth/google`;
  return (
    <div>
      Unauthorized {"    "}
      <a href={googleURL}>Login</a>
    </div>
  );
}

export default Login;
