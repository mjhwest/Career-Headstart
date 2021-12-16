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

As a team we decided to build a full-stack employment based web-application called **Career Headstart**. The application allows a user to signup as one of two categories, either an employer (i.e looking to hire a worker) or a candidate (i.e. looking for work), depending on which option they select additional sign up inputs will be required.

There were a number of problems that had to be resolved in order to successfuly launch the web-application **Career Headstart**. 
To view [career headstart and see how it works please click here](https://career-head-start.herokuapp.com/)

 1) Ensuring all the relationships between the databases were correctly assigned. 
 2) Understading and implementing git branching, mergings while working in a team enviroment.
 3) Ensuring that all memebers of the project understood the desired outcome and were able to efficiently work towards this outcome. 
 4) Ensuring the post signup route was correctly created so that a user could sign up as either an Employer or Candidate (i.e jobseeker). 
 5) That all routes were successfully functioning. 
 

 Depsite these probems we were able to overcome them to successfully create and launch our application. In doing so we learnt many skills that will help us to further develop as web developers. 

 Overall, creating **Career Headstaer** was a great experience that allowed each team member to apply the skills and knoweledge attained from our learning experience thus far. 


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [License](#license)
- [Contribute](#contribute)


## Installation
Once the user has cloned the project from GitHub there are a few steps they must undertake in order to get the application running.

You’ll need to open the command terminal and input 'npm install' to install all the neccessary dependencies. 

Use the `schema.sql` file in the `db` folder to create your database with MySQL shell commands. To create the database you need to open the terminal command line (in the DB folder)  Use environment variables to store sensitive data like your MySQL username, password, and database name.

Once the schema has been established, you need to 'seed' the database. 
This is done by running  `npm run seed` to seed data to your database so that you can test your routes.

Once the seeds have been executed create the code needed in `server.js` to sync the Sequelize models to the MySQL database on server start.


## Usage
ADD USAGE HERE ******************************************************************************
Provide instructions and examples for use. Include screenshots as needed.
To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
    ```md
    ![alt text](assets/images/screenshot.png)
    ```

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

## Credits
The collaborators for this project were: 
- Roshan Bajracharya - https://github.com/bajraroshan
- Carl Santiago - https://github.com/carlsantiago
- Michael West - https://github.com/mjhwest


## Contribute
If you would like to contribute to the project please either the collaborators: 
- Roshan Bajracharya - bajraroshan@gmail.com
- Carl Santiago - https://github.com/carlsantiago
- Michael West - mjhwest89@gmail.com


## License
This project is released under the [MIT LICENSE](ADD LINK TO LICENSE IN GIT REPO HERE).

![License](https://img.shields.io/badge/license-MIT-blue)


## Tests
DO WE WANT TO ADD TEST STUFF HERE.
Go the extra mile and write tests for your application. Then provide examples on how to run them here.