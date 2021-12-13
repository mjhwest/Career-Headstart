const sequelize = require('../config/connection');
const { User, Employer, JobSeeker, JobListings, Application } = require('../models');

const applicationData = require('./applicationData.json');
const employerData = require('./employerData.json');
const JoblistingsData = require('./JoblistingsData.json');
const jobseekerData = require('./jobseekerData.json');
const userData = require('./userData.json');

const seedDatabase = async() => {

    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n')

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const employer of employerData) {
        await Employer.create({
            ...employer,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }


    for (const jobseeker of jobseekerData) {
        await JobSeeker.create({
            ...jobseeker,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    for (const joblistings of JoblistingsData) {
        await JobListings.create({
            ...jobseeker,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    for (const application of applicationData) {
        await Application.create({
            ...application,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    process.exit(0)
}





seedDatabase();