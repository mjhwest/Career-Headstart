const req = require('express/lib/request');
const res = require('express/lib/response');
const nodemailer = require('nodemailer');
const { Application, JobSeeker, User, JobListing, Employer } = require('./models')

require('dotenv').config()
    //we need this is config enviromental varaibles, i.e. transporter, i.e. the users email and password 
    //need user email and password included in .env

//step 1: create transporter, what connects to user service 
//this is oly for gmail. 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

//step 2: 
//mail options, what do we want to send. 
//create an object 

// let mailOptions = {
//     from: 'careerheadstartboss@gmail.com',
//     to: userEmail, //THIS NEEDS TO BE THE EMPLOYER USER EMAIL 
//     subject: 'Job Application Success', //GENERIC SUBJECT TITLE 
//     text: '',
// };
//This is what the text will say: 
// Congratulations,
// USER, firstName + lastName has applied for your advertised position (jobTitle). 


const constructEmail = (applicationJSON) => {

    const employer = applicationJSON.joblisting.employer

    const jobseeker = applicationJSON.jobseeker

    return {
        from: 'careerheadstartboss@gmail.com',
        to: employer.user.email,
        subject: 'One New Job Application',
        text: `Congratulations, ${employer.user.firstName}, 
        
        ${jobseeker.user.firstName} ${jobseeker.user.lastName} has applied for your advertised position ${applicationJSON.joblisting.jobTitle}.`
    }
}

//step 3;
//grab transporter 
//sendMail has 2 param, mailOptions and callback
// transporter.sendMail(mailOptions, function(err, data) {
//     if (err) {
//         console.log('Error');
//     } else {
//         console.log('Email send');
//     }
// });

//make a function to get the user email info 
const sendApplicationAlert = async(application_id) => {

    //load application

    const loadedApplication = await Application.findByPk(application_id, {
        include: [{
                model: JobSeeker,
                include: [{
                    model: User,
                }]
            },
            {
                model: JobListing,
                include: [{
                    model: Employer,
                    include: [{
                        model: User,
                    }]
                }]
            }
        ]
    })

    const applicationJSON = loadedApplication.toJSON()
        // console.log(JSON.stringify(loadedApplication.toJSON(), null, 4))
    const mailOptions = constructEmail(applicationJSON)
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Email send');
        }
    })
}

module.exports = sendApplicationAlert;