import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from './Navbar';

export default function Iframe(props) {
    const editor = useRef(null)

    const [post, setPost] = useState({
        content: "",
        data: "heh"
    })
    return (
        <>
            <Navbar />
            <div className='container' style={{marginTop: '7rem'}}>
                <JoditEditor
                    ref={editor}
                    value={post.content}
                    onChange={newContent => setPost({ ...post, content: newContent })}
                />
            </div>
        </>
    )
}
