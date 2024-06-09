import React, { useEffect } from 'react'
import whitePage from '../utilities/white-blank-page.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Notes from '../models/note'
import { useState } from 'react'
import {deleteNoteById} from '../services/noteService'

export default function Note(props) {
    const [noteObject, setNoteObject] = useState(new Notes());
    const navigate = useNavigate();
    useEffect(
        () => {
            const noteObj = new Notes(props.name, props.note, props.tag, props.id);
            setNoteObject(noteObj);
        }, [props.name, props.note, props.tag]
    )

    const onDeleteClicked = async (id) => {
        var retrievedToken  = window.localStorage.getItem('jwt-Token');
        await deleteNoteById(retrievedToken, id);
        props.onDeleted(true);
    }

    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <img src={whitePage} className="card-img-top" alt="blank-white-page" style={{
                    width: '100%',
                    height: '40vh',
                    objectFit: 'cover'
                }} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <Link
                        className="btn btn-primary"
                        to="/iframe"
                        state={noteObject}>
                        Open the Note
                    </Link>
                    <button type="button" className="btn btn-danger" style={{marginLeft: '1rem'}} onClick={ () => {
                        onDeleteClicked(props.id)
                    }}>Delete</button>
                    <div className="card-text"><small className="text-body-secondary">Last Modified at {props.lastModifiedAt ? new Date(props.lastModifiedAt).toUTCString() :
                        "Not Available"}
                    </small></div>
                </div>
            </div>
        </div>
    )
}
