import React, { useEffect, useState } from 'react'
import './../sass/Login.scss';
import guru from '../../../public/logo.png'
import axios from 'axios';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleCalls = async () => {

        if (password.length > 8 && email.length > 0) {
            await axios.post('http://localhost:8080/admins/new', {
                name: name,
                email: email,
                password: password
            })
            alert('Login Successful!')
        }
       else if (password.length < 8) {
        alert('Password must be at least 8 characters')
       }
        else {
        alert('Please enter both email and password')
       }
    }
  return (
    <div className='main'>
          <div className="container">
              <img src={guru} alt="user" />
<div className="upper">
    <p className="sign" align="center">Sign in</p>
    <p className="or" align="center">Please provide your credientials!</p>
</div>
    <form className="form1">
    <input required className="un " type="text" align="center" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input required className="un " type="email" align="center" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input required className="un" type="password" align="center" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>password must contain 8 letters</p>
      <a className="submit" align="center" onClick={() => handleCalls()}>Sign in</a>
    </form>     
    </div>
    </div>
  )
}

export default Login