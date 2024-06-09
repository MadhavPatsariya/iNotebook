export const createNotes = async (note, jwtToken) => {
    try{
        await fetch('http://localhost:3001/api/notes/create-new-note',{
            method: 'POST',
            body: JSON.stringify({
                name: note.name,
                note: note.note,
                tag: note.tag
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'jwt-token': jwtToken
            },
        })
    }
    catch(error){
        console.log(error);
    }
}

export const updateNote = async (note, jwtToken, id) => {
    try{
        await fetch(`http://localhost:3001/api/notes/update-note/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                name: note.name,
                note: note.note,
                tag: note.tag
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'jwt-token': jwtToken
            },
        })
    }
    catch(error){
        console.log(error);
    }
}

export const getAllNotes = async (jwtToken) => {
    try{
        var response = await fetch('http://localhost:3001/api/notes/all-notes',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'jwt-token': jwtToken
            },
        })
        var data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const getNoteById = async (jwtToken, id) => {
    try{
        const response = await fetch(
            `http://localhost:3001/api/notes/note/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'jwt-token': jwtToken
                }
            }
        )
        const data = await response.json();
        console.log("data: " + JSON.stringify(data));
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const deleteNoteById = async (jwtToken, id) => {
    try{
        await fetch(
            `http://localhost:3001/api/notes/delete-note/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'jwt-token': jwtToken
                }
            }
        )
        console.log("deleted successfully");
    }
    catch(error){
        console.log(error);
    }
}