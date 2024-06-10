import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import Note from './Note'
import { useLocation } from 'react-router-dom';
import {getAllNotes} from '../services/noteService';
import {getUserDetails} from '../services/userService';
import { Context } from '../utilities/Context';
import Alert from './Alert';

export default function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState([]);
  const { name, setName } = useContext(Context);
  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    var retrievedToken  = window.localStorage.getItem('jwt-Token');
    const retrievedId = location.state?.id;
    const retrievedLoggedIn = location.state?.loggedIn;
    setLoggedIn(retrievedLoggedIn);
    getUser(retrievedToken);
    getNotes(retrievedToken);
  }, [refresh, loggedIn]);

  const getNotes = async (retrievedToken) => {
    var note = await getAllNotes(retrievedToken);
    setNote(note);
    setLoading(false);
  }; 

  const noteDeleted = (shouldRefresh) => {
    setDeleted(true);
    setTimeout(()=> {
      setRefresh(shouldRefresh);
    }, 1000);
  }

  const getUser = async (retrievedToken) => {
    var currentUser = await getUserDetails(retrievedToken);
    setName(currentUser.name);
  }
  const alertStyle = {
    marginTop: '3.5rem'
  }
  return (
    <div>
      <Navbar/>
      {loggedIn === true ? (<Alert description="Logged In Successfully" type="success" style={alertStyle}/>) : null}
      {deleted === true ? (<Alert description="Note Deleted Successfully" type="success" style={alertStyle}/>) : null}
      {loading === true ? (<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        </div>) : (
              <div className="container mt-5">
              <div className="row">
                  {note.length === 0 ? <h5 style={{marginTop: '3rem'}}>No notes available, Kindly create a note</h5> : note.map((element, index) =>
                      element.name != null &&
                      element.note != null &&
                      element.lastModifiedAt != null && 
                      element.tag != null ? (
                        <div className="col-md-4 mt-4" key={element._id + index}>
                          <Note
                            name={element.name}
                            note={element.note}
                            lastModifiedAt={element.lastModifiedAt}
                            tag={element.tag}
                            id={element._id}
                            onDeleted = {noteDeleted}
                          />
                        </div>
                      ) : console.log(JSON.stringify(element))
                    )}
              </div>
            </div>
      )}
    </div>
  )
}
