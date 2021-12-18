const req = require("express/lib/request");
const res = require("express/lib/response");
const nodemailer = require("nodemailer");
const {
  Application,
  JobSeeker,
  User,
  JobListing,
  Employer,
} = require("./models");

require("dotenv").config();


//step 1: create transporter, what connects to user service
//this is oly for gmail.
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});



const constructEmail = (applicationJSON) => {
  const employer = applicationJSON.joblisting.employer;

  const jobseeker = applicationJSON.jobseeker;

  return {
    from: "careerheadstartboss@gmail.com",
    to: employer.user.email,
    subject: "One New Job Application",
    text: `Congratulations, ${employer.user.firstName}, 
    
        ${jobseeker.user.firstName} ${jobseeker.user.lastName} has applied for your advertised position ${applicationJSON.joblisting.jobTitle}.`,
  };
};


const sendApplicationAlert = async (application_id) => {
  //load application

  const loadedApplication = await Application.findByPk(application_id, {
    include: [
      {
        model: JobSeeker,
        include: [
          {
            model: User,
          },
        ],
      },
      {
        model: JobListing,
        include: [
          {
            model: Employer,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      },
    ],
  });

  if (!loadedApplication) {
      console.log("No application found in the DB")
  } else {
    const applicationJSON = loadedApplication.toJSON();
    // console.log(JSON.stringify(loadedApplication.toJSON(), null, 4))
    const mailOptions = constructEmail(applicationJSON);
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email send");
      }
    });
  }
};

module.exports = sendApplicationAlert;
