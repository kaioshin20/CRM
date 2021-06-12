const express =require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")
const logger=require("morgan")
const cors=require("cors")

const app=express();
app.use(cors());

const server = require('http').createServer(app);

const dbConfig=require("./config/secret")

const auth=require("./routes/authRoute");

// WAREHOUSE
const wms = require("./routes/wms")


// CRM 
const contact = require("./routes/CRM/contactRoute")
const company = require("./routes/CRM/companyRoute")
const deal = require("./routes/CRM/dealRoute.js")
const ticket = require("./routes/CRM/ticketRoute.js")
const activity = require("./routes/CRM/activityRoute.js")
const task = require("./routes/CRM/taskRoute.js")
const meeting = require("./routes/CRM/meetingRoute.js")
const event = require("./routes/CRM/eventRoute")
const note = require("./routes/CRM/notesRoute")
const grant = require("./routes/CRM/grantRoute")

//mailer
const sendMail = require('./routes/CRM/sendMailRoute')

//Pricing
const pricing = require('./routes/Pricing/pricing.js')


// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Credentials","true");
//   res.header("Access-Control-Allow-Methods",'GET','POST','DELETE','PUT','OPTION');4
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin,X-Requested-With,Content-Type,Accept,Authorization'
//   );
//   next();
// })

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(cookieParser());    
//app.use(logger('dev'))
mongoose.promise=global.promise;
mongoose
    .connect(dbConfig.url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));



app.use("/api/users",auth);

//warehouse
app.use("/api/wms",wms)

// CRM routes
app.use("/api/contacts", contact)
app.use("/api/companies", company)
app.use("/api/deals", deal)
app.use("/api/tickets", ticket)
app.use("/api/activity", activity)
app.use("/api/tasks", task)
app.use("/api/meetings", meeting)
app.use("/api/events", event)
app.use("/api/notes", note)
app.use("/api/grants", grant)
app.use("/api/sendmail", sendMail)

// Pricing
app.use("/api/pricing", pricing)

server.listen(5000,()=>{
    console.log("Running 5000!!")
})
