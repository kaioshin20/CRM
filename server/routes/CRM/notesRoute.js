const express=require("express");
const router=express.Router();

const Note = require("../../models/CRM/notesModel");

const NoteCtrl=require("../../controllers/CRM/note");
// Create New Contact
router.post("/create",NoteCtrl.createNote);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.json(err))

});

// // Edit Particular Contact with id
// router.get("/edit/:id",TaskCtrl.editTask);




module.exports=router;
