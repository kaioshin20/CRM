const AccessControl = require("accesscontrol");
const axios = require("axios")
const mongoose=require("mongoose");
const Grant = require("../models/grantModel")
const grants = 
[
    { role: 'admin', resource: 'profile', action: 'create:any'},
    { role: 'admin', resource: 'profile', action: 'read:any'},
    { role: 'basic', resource: 'profile', action: 'read:any'},
]



exports.roles = new AccessControl(grants)