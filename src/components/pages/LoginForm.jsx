import React from 'react'
import "../sass/Login.scss";
import guru from "../../../public/logo.png";

function LoginForm({email, password, error, setEmail, setPassword, setError, login}) {
  return (
    <div className="main">
    <div className="container">
    <img src={guru} alt="user" />
    <div className="upper">
      <p className="sign" align="center">
        Welcome back!
      </p>
      <p className="or" align="center">
        Please provide your credientials.
      </p>
    </div>
    <form className="form1">
      <input
        required
        className="un "
        type="email"
        align="center"
        placeholder="Email *"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value), error && setError(false);
        }}
      />
      <input
        required
        className="un"
        type="password"
        align="center"
        placeholder="Password *"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value), error && setError(false);
        }}
      />
      <p
        className={error ? "error" : ""}
        style={{ top: "135%", left: "23%" }}
      >
        Please check your credientials properly!!
      </p>
      <a
        className="submit"
        align="center"
        onClick={async () => await login()}
      >
        Login
      </a>
    </form>
  </div>
  </div>
  )
}

export default LoginForm