import React from "react";
import useAuth from "./useAuth";
import "./../sass/images.scss";
import axios from "axios";

const Login = () => {
  const {user, loading} = useAuth();
  // console.log(user);
  
  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const handleLogout = async () => {
     const red = await axios.get("http://localhost:8080/api/logout", {withCredentials: true});
    console.log(red);
    if (red.data === 'Logged out') {
    window.open("http://localhost:5173", "_self");
    }
    
    };  

  return (
    <>
      {user ? (
        <div className="login">
          <img src={user.profile} alt="User profile" onClick={handleLogout} />
        </div>
      ) : (
    // <div className="btn">
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "5.8rem",
            height: "100%",
            backdropFilter: "blur(10px)",
            background: "#f5bf42",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            fontWeight: "300",
            cursor: "pointer",
            padding: "6px 1.6rem",
        }}
        >
          Login
        </button>
    // </div>
      )}
    </>
  );
};

export default Login;
