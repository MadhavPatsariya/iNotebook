import React, { useEffect, useState } from 'react'
import backgroundImage from '../utilities/sign-up-bg.jpg'
import {createUser} from '../services/userService'
import { useNavigate } from "react-router-dom"
import User from '../models/user'
export default function Signup() {

    const [user, setUser] = useState(new User());
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate()

    const updateName = (event) => {
        const newValue = event.target.value;
        setName(newValue);
        console.log("setName:" + newValue)
    }

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

    const createUserModel = async (event) => {
        var user = new User(name, email, password);
        setUser(user);
        event.preventDefault();
    try {
      const jwtToken = await createUser(user);
      console.log("token in signUp: " + jwtToken)
      if (jwtToken) {
        window.localStorage.setItem('jwt-Token', jwtToken);
        navigate('/home');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
    }

    // useEffect( () => {
    //     var jwtToken = createUser(user);
    //     if(jwtToken != null){
    //         window.localStorage.setItem("jwt-Token", jwtToken); 
    //         navigate('/home');
    //     }
    // },[]);

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
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={updateName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={updateEmail}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={updatePassword}/>
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: "#8e9a65" }} onClick={createUserModel}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
