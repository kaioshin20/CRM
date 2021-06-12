const express=require("express");
const router=express.Router();

const Task = require("../../models/CRM/taskModel");

const TaskCtrl=require("../../controllers/CRM/task");
// Create New Contact
router.post("/create",TaskCtrl.createTask);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

});

// // Edit Particular Contact with id
// router.get("/edit/:id",TaskCtrl.editTask);




module.exports=router;
