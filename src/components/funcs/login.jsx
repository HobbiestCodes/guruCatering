import React, { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';

const GoogleLoginButton = () => {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "191921688962-k3bbbo6cvko5ter8c9gbqu59mtptl7ha.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // google.accounts.id.renderButton(
    //   document.getElementById('google-signin-button'),
    //   { theme: 'filled_white', size: 'large' }
    // );
  }, []);
  const handleLogin = () => {
    google.accounts.id.prompt();
  }
  const handleCallbackResponse = async (response) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/google', { token: response.credential });
      const { token, role } = res.data;
    
    console.log('Token:', token); 
    console.log('Role:', role);

    

      // Save token in local storage or set up state management
      localStorage.setItem('token', token);

      // Handle post-login actions (e.g., redirect, fetch user data)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <button 
    onClick={handleLogin} 
    style ={{
      width: '100%',
      height: '100%',
      backdropFilter: 'blur(10px)',
      background: '#ffffff50',
      border: 'none',
      borderRadius: '100px',
      color: 'black',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      padding: '6px 1.6rem',
    }}
  >Login</button>;
};

export default GoogleLoginButton;
