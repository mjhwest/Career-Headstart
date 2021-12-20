# Career Headstart

![License](https://img.shields.io/badge/license-MIT-blue)


## Description
Working in a small group we were given the opportunity to create and develop a full-stack web-application of our choosing.

The project had to include the following: 
- MVC Paradigm 
- Create server-side API
- User Authentication 
- Connect to MySQL Database
- A new technology not included in course content 
- Be responsive 
- Be deployed on GitHub
- Be deployed on Heroku 
- Have a clean repository that meet quality coding standards
- Have a quality README 

Our motivation was to make an application that highlighted all the skills and knowledge we have learnt so far in our web-development journey. 

As a team we decided to build a full-stack employment based web-application called **Career Headstart**. The application allows a user to signup as one of two categories, either an employer (i.e looking to hire a worker) or a job seeker (i.e. looking for work). To sign up users must fill out the basic user information (First Name, Last Name, Email, Password, Age) and then select if they are signing up as an Employer or Job Seeker; depending on which option they select additional sign up inputs will be required. If a user is signing up as a Job Seeker they must additionally answer if they have a car license, if they sign up as a Employer they must provide Company Name and Phone Number, 

There were a number of problems that had to be resolved in order to successfuly launch the web-application **Career Headstart**. 

 1) Ensuring all the relationships between the databases were correctly assigned. 
 2) Understading and implementing git branching, mergings while working in a team enviroment.
 3) Ensuring that all memebers of the project understood the desired outcome and were able to efficiently work towards this outcome. 
 4) Ensuring the post signup route was correctly created so that a user could sign up as either an Employer or Candidate (i.e jobseeker). 
 5) That all routes were successfully functioning. 
 
 Despite these probems we were able to overcome them to successfully create and launch our application. In doing so we learnt many skills that will help us to further develop as web developers. 

 Overall, creating **Career Headstaer** was a great experience that allowed each team member to apply the skills and knoweledge attained from our learning experience thus far. 

 To view [career headstart and see how it works please click here](https://career-head-start.herokuapp.com/)


 ------------------------------------------------------------------------------

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [License](#license)
- [Contribute](#contribute)

------------------------------------------------------------------------------

## Installation
Once the user has cloned the project from GitHub there are a few steps they must undertake in order to get the application running.

First, the command terminal must be opened and a user must input 'npm install' to install all the neccessary dependencies. 

Use the `schema.sql` file in the `db` folder to create your database with MySQL shell commands. To create the database you need to open the terminal command line (in the DB folder)  Use environment variables to store sensitive data like your MySQL username, password, and database name.

Once the schema has been established, you need to 'seed' the database.

This is done by running  `npm run seed` to seed data to your database so that you can test your routes.

Once the seeds have been executed create the code needed in `server.js` to sync the Sequelize models to the MySQL database on server start.

------------------------------------------------------------------------------

## Usage
The usage of this application is somewhat straight forward. 

The user will first be presented with the landing page

![landing](/public/images/landing.png)

Once at the landing page the user can signup as a job seeker or employer, and fill out necessary fields. 

    **JOB SEEKER**                                                                                       **EMPLOYER**
![signup](/public/images/signupjob.png)                                                      ![empsign](/public/images/empsign.png)




**This section will look at Usage for JOBSEEKER**

Once the user has signed up as a job seeker they will be presented with a profile. Here they can edit their personal details, select 'Dashboard' (which will list jobs they have applied for), select Jobs (to see current jobs going) and Logout. 

![emppro](/public/images/emppro.png)

If the user selects on "Jobs" they will be presented with current jobs that employers currently have listed. Here the user can see the Job Title, the company it belong too, the location of the job as the work load (casual, full-time, part-time). 

![currentjobs](/public/images/currentjobs.png)

If the user selects a job they will be taken to a new page where the job will be listed (in this instance 'Night Shift Manager'). 
Here they will be presented with the company name, a brief description of the company, and the job overview (salary, industry, experience and qualification required.)

![jobop](/public/images/jobop.png)

The user can then select to apply for the job if they desire. Once they have hit apply, an email will be sent to the employer, informing them that the user has applied for the job and provide with employer with the users contact email. 
Once applied the user will be sent to their personal dashboard where they can see all the jobs they have currently applied for. In this instance user (Adam) has only applied for 1 job

![applied](/public/images/applied.png)

The user can contiune to apply for more jobs (however, they will only be able to apply for 1 job once).



**This section wll look at Usage for EMPLOYER**

Similar to the job seeker profile, the employer profile allows an employer to edit their profie, to view current jobs, to view their dashboard (here they can view the jobs have the posted), logout as well as post a job. 

![employerprofile](/public/images/employerprofile.png)

The user can select to post a job, here they must be out all forms. Once they have filled all neccessary fields the job will be automatically posted to the jobs page (as well as a mix of jobs from other employers) and will also be posted in the dashboard for the employer. 

![job2](/public/images/job2.png)                                                            ![job3](/public/images/job3.png)

If the user is logged in as an employer and a job seeker applies for their job they will recieve an automated email stating that a specific user has applied for the job they have listed, and will be provided with the job seekers email. 
For example a user called "Hugh Flex" applied for a position as "Truck Driver" that the Employer "Michael" had posted. 

![applied](/public/images/applied.png)


------------------------------------------------------------------------------
## Features
- bcrypt
- Bootstrap 
- connect-sessoin-sequelize
- CSS
- dotenv
- express
- express-handlbars 
- express-session
- Font Awesome 
- Google Fonts 
- Heroku
- Javascript 
- JAWSDB
- mySQL 
- NodeMailer 
- path
- sequelize 
- sass
- vue

------------------------------------------------------------------------------

## Credits
The collaborators for this project were: 
- Roshan Bajracharya - https://github.com/bajraroshan
- Carl Santiago - https://github.com/carlsantiago
- Michael West - https://github.com/mjhwest

------------------------------------------------------------------------------

## Contribute
If you would like to contribute to the project please either the collaborators: 
- Roshan Bajracharya - bajraroshan@gmail.com
- Carl Santiago - https://github.com/carlsantiago
- Michael West - mjhwest89@gmail.com

------------------------------------------------------------------------------

## License
This project is released under the [MIT LICENSE](ADD LINK TO LICENSE IN GIT REPO HERE).

![License](https://img.shields.io/badge/license-MIT-blue)

