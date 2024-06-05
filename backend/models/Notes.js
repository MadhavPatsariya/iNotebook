const mongoose = require('mongoose');
const {Schema} = mongoose;
const general = "GENERAL";
const NotesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        default: general
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    note: {
        type: String,
        required: true
    }
});
const Notes = mongoose.model('notes', NotesSchema);
Notes.createIndexes();
module.exports = Notes;