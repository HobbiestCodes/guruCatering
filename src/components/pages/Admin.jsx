import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../ui/admin";
import LoginForm from "./LoginForm";
function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [error, setError] = useState(false);
  const [noDevice, setNoDevice] = useState(false);

  useEffect(() => {
      if(window.innerWidth < 456) {
        setNoDevice(true);
      }
  }, []);
  const handleLogin = async () => {
    const data = await axios.post("http://localhost:8080/admins/login", {
      email: email,
      password: password,
    });
    if (!data.data.success) {
      setError(true);
      return;
    }

    if (data.data.success) {
      setAccess(true);
      return;
    }
  };

  return (
    <>
    {
      noDevice ? <h1 style={{color: 'black', fontSize: '1.8rem'}}>Not supported in mobile devices...</h1> : 
      access ? <Dashboard /> : <LoginForm email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} setError={setError} login={handleLogin} />
    }
    </>
  );
}

export default Admin;
