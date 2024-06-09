import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userIcon from '../utilities/person.svg'
import { Context } from '../utilities/Context';
export default function Navbar() {
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem('jwt-Token');
    navigate("/")
  }
  const { name, setName } = useContext(Context);
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/iframe">Create A Note</Link>
              </li>
            </ul>
            <div className="d-flex" style={{ marginRight: '1rem' }} >
              <div className="dropdown">
                <button className="btn btn dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={userIcon} style={{ width: '1.5rem', marginLeft: '1rem' }} alt="icon" />
                  <span style={{ flexGrow: 1, textAlign: 'center', marginLeft: '0.5rem', marginRight: '1rem' }}>{name}</span>
                </button>
                <ul className="dropdown-menu"style={{width: '4rem'}}>
                  <li><button className="dropdown-item"onClick={logOut}>Log Out</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
