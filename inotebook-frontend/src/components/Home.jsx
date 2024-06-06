import React from 'react'
import Navbar from './Navbar'
import Note from './Note'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <div className="row">
            <div className='col-lg-4 mt-5'>
                <Note/>
            </div>
            <div className='col-md-4 mt-5'>
                <Note/>
            </div>
            <div className='col-lg-4 mt-5'>
                <Note/>
            </div>
        </div>
      </div>
    </div>
  )
}
