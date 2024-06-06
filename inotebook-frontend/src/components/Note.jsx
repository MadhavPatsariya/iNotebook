import React from 'react'
import whitePage from '../utilities/blank-white-page.jpg'
import { Link } from 'react-router-dom'
export default function Note() {
    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <img src={whitePage} className="card-img-top" alt="blank-white-page" style={{
            width: '100%',
            height: '40vh',}}/>
                <div className="card-body">
                    <h5 className="card-title">Note #1</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}                    
                    <Link className="btn btn-primary" to="/iframe">Open the Note</Link>
                </div>
            </div>
        </div>
    )
}
