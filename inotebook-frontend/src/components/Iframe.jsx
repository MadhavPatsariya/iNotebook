import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from './Navbar';
import Notes from '../models/note';
import { createNotes, updateNote } from '../services/noteService';
import { useLocation } from 'react-router-dom';
import Alert from './Alert';

export default function Iframe(props) {
    const location = useLocation();
    const editor = useRef(null)
    const noteObject = location.state || {};
    const [name, setName] = useState(noteObject.name || '');
    const [tag, setTag] = useState(noteObject.tag ||'');
    const [note, setNote] = useState(noteObject.note || '');

    const [updated, setUpdated] = useState(false);
    const [created, setCreated] = useState(false);

    const alertStyle = {
        marginTop: '3.5rem'
      }

    useEffect(() => {
    }, [noteObject])

    const updateName = (event) => {
        const newValue = event.target.value;
        setName(newValue);
    }

    const updateTag = (event) => {
        const newValue = event.target.value;
        setTag(newValue);
    }
    const onSaveClicked = async () => {
        var newNote = new Notes(name, note, tag);
        const jwtToken = window.localStorage.getItem('jwt-Token');
        if ((noteObject != null || noteObject != undefined) && noteObject.id != null) {
            console.log("update clicked")
            await updateNote(newNote, jwtToken, noteObject.id);
            setUpdated(true);
        }
        else {
            console.log("creaete clicked")
            await createNotes(newNote, jwtToken);
            setCreated(true);
        }
    }
    return (
        <>
            <Navbar name="user" />
            {updated === true ? (<Alert description="Note Updated Successfully" type="success" style={alertStyle}/>) : null}
            {created === true ? (<Alert description="Note Created Successfully" type="success" style={alertStyle}/>) : null}
            <div className='container' style={{ marginTop: '7rem' }}>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm" style={{ minWidth: '8rem' }}>Name of the note</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={name} onChange={updateName} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm" style={{ minWidth: '8rem' }}>Tag for the note</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={tag} onChange={updateTag} />
                </div>
                <JoditEditor
                    ref={editor}
                    value={note}
                    onChange={(newContent) => {
                        setNote(newContent);
                        console.log(newContent);
                    }
                    }
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '2.5rem' }}>
                <button type="submit" className="btn" style={{ backgroundColor: "#8e9a65" }} onClick={onSaveClicked}>Save Changes</button>
            </div>
        </>
    )
}
