import React, { useState } from 'react'
import backgroundImage from '../utilities/login-page-background.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import User from '../models/user'
import {loginUser} from '../services/userService'
export default function Login() {

    const [user, setUser] = useState(new User());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const updateEmail = (event) => {
        const newValue = event.target.value;
        setEmail(newValue);
        console.log("setEmail:" + newValue)
    }

    const updatePassword = (event) => {
        const newValue = event.target.value;
        setPassword(newValue);
        console.log("setPassword:" + newValue)
    }

    const login = async (event) => {
        var user = new User('', email, password);
        setUser(user);
        event.preventDefault();
        try {
            const data = await loginUser(user);
            const jwtToken = data.authToken;
            const id = data.id;
            console.log("token in login: " + jwtToken);
            console.log("id in login: " + id);
            if (jwtToken) {
              window.localStorage.setItem('jwt-Token', jwtToken);
              navigate('/home', { state: { id } });
            }
          } catch (error) {
            console.error('Failed to create user:', error);
          }
    } 

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <div className="col-md-3">
                <form>
                    {/* backgroundColor: '#e7e4d5' */}
                    <div style={{ backgroundColor: '#d3d0c1', opacity: '0.95', padding: '40px 20px' }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={updateEmail}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={updatePassword}/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn" style={{backgroundColor: "#8e9a65"}} onClick={login}>Login</button>
                        </div>
                        <div className='mb-3'>
                            <Link to="/signup">Sign up now</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
