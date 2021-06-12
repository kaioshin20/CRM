const express=require("express");
const router=express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amitnemade34@gmail.com',
      pass: 'Amit@341999'
    }
  });


  

router.post('/', (req, res) => {
    console.log(req.body)
    var ownermailOptions = {
        from: 'amitnemade34@gmail.com',
        to: req.body.owner,
        subject: 'Meeting Scheduled',
        text: 'You have scheduled a meeting on'+ req.body.meeting.startTime + '. Please find the details below. \n Subject: ' + req.body.meeting.subject +'\n'
                +'Scheduled on: ' + req.body.meeting.startTime + '\n Description: ' + req.body.meeting.description + '\n'
      };

    var attendeemailOptions = {
        from: 'amitnemade34@gmail.com',
        to: req.body.attendee,
        subject: 'Meeting Scheduled',
        text: 'You have a meeting scheduled by Amit. Please find the details below. \n Subject: ' + req.body.meeting.subject +'\n' +
                'Scheduled on: ' + req.body.meeting.startTime +'\n Description: '+ req.body.meeting.description +'\n'
      };
    var contactmailOptions = {
        from: 'amitnemade34@gmail.com',
        to: req.body.associateContacts,
        subject: 'Meeting Scheduled',
        text: 'You are kindly invited on a meeting scheduled by Amit on ' + req.body.meeting.startTime + '. Please find the details below. \n Subject: ' + req.body.meeting.subject + '\n' +
                'Scheduled on: ' + req.body.meeting.startTime +'\n Description: '+ req.body.meeting.description +'\n'
      };
      
    var companymailOptions = {
        from: 'amitnemade34@gmail.com',
        to: req.body.associateCompanies,
        subject: 'Meeting Scheduled',
        text: 'We have scheduled a meeting with your company. Please find the details below. \n Subject: ' + req.body.meeting.subject + '\n' +
                'Scheduled on: ' + req.body.meeting.startTime +'\n Description: '+ req.body.meeting.description +'\n'
      };
    

    transporter.sendMail(ownermailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Owner Email sent: ' + info.response);
        }
      });
    transporter.sendMail(attendeemailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('attendee Email sent: ' + info.response);
        }
      });
    transporter.sendMail(contactmailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('contact Email sent: ' + info.response);
        }
      });
    transporter.sendMail(companymailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('company Email sent: ' + info.response);
        }
      });

})

module.exports=router;