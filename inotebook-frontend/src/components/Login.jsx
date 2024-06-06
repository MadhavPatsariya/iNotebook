import React from 'react'
import backgroundImage from '../utilities/login-page-background.jpg'
export default function Login() {
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
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn" style={{backgroundColor: "#8e9a65"}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
