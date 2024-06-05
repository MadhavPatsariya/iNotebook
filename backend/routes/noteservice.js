const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const notes = require('../models/Notes');
const getUser = require("../middleware/getuser");
/**
 * create new notes
 */
router.post('/create-new-note', getUser, [
    body('name', 'Title cannot be empty').exists(),
    body('note', 'Should have some body').isLength({ min: 3 }),
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    var user = request.user.id;
    var doesExists = await notes.findOne({ name: request.body.name });
    if (doesExists) {
        return response.json({
            error: "Error Occurred",
            message: "Sorry, already notes exists with this title",
        });
    } else {
        notes.create({
                name: request.body.name,
                note: request.body.note,
                user: user
            }).then((notes) => {
            return response.json({ note: notes.note });
        }).catch((error) => {
            console.log("Error:" + error.message);
            return response.json({
                error: "Error occurred ",
                message: error.message,
            });
        });
    }
});

/**
 * update notes
 */
router.put('/update-note/:id', getUser, async (request, response) => {
    try{
        var user = request.user.id;
        var newNote = {};
        const {name, note, tag} = request.body
        if(name){
            newNote.name = name
        }
        if(note){
            newNote.note = note
        }
        if(tag){
            newNote.tag = tag
        }
        var oldNote = await notes.findById(request.params.id);
        if(!oldNote){
            return response.status(404).json({error: "Note not Found"});
        }
        if(oldNote.user != user){
            return response.status(401).json({error: "Unauthorized for accessing this note!"})
        }
        notes.findByIdAndUpdate(request.params.id, {$set : newNote},  {
            new: true
          }).then((notes) => {
            return response.json({ note: notes.note });
        })
    }
    catch(error){
        console.log("Error:" + error.message);
        return response.json({
            error: "Error occurred ",
            message: error.message,
        });
    }
});

/**
 * get all notes
 */
router.get('/all-notes', getUser,async (request, response) => {
    try{
        var userId = request.user.id;
        const allNotes = await notes.find({ user: userId }).populate('user').exec();
        return response.json(allNotes);
    }
    catch(error){
        console.log("Error:" + error.message);
        return response.json({
            error: "Error occurred ",
            message: error.message,
        });
    }
});

/**
 * get one note by name
 */
router.get('/note', getUser,  [
    body('name', 'Title cannot be empty').exists()],  async (request, response) => {
    try{
        var userId = request.user.id;
        const currentNote = await notes.findOne({ name: request.body.name, user: userId});
        return response.json(currentNote);
    }
    catch(error){
        console.log("Error:" + error.message);
        return response.json({
            error: "Error occurred ",
            message: error.message,
        });
    }
});

/**
 * get one note by name
 */
router.get('/note/:id', getUser, async (request, response) => {
    try{
        var userId = request.user.id;
        const currentNote = await notes.findOne({ _id: request.params.id, user: userId});
        return response.json(currentNote);
    }
    catch(error){
        console.log("Error:" + error.message);
        return response.json({
            error: "Error occurred ",
            message: error.message,
        });
    }
});

/**
 * delete the note by id
 */
router.delete('/delete-note/:id', getUser, async(request, response) => {
    try{
        var userId = request.user.id;
        const currentNote = await notes.findOne({ _id: request.params.id, user: userId});
        if(!currentNote){
            return response.status(400).json({error: "Bad Request. Note does not exists"})
        }
        notes.findByIdAndDelete(request.params.id).then(() => {
            return response.status(200).json({message: "Deleted Successfully"})
        });
    }
    catch(error){
        console.log("Error:" + error.message);
        return response.json({
            error: "Error occurred ",
            message: error.message,
        });
    }
})

module.exports = router;