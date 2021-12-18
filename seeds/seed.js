const sequelize = require('../config/connection');
const { User, Employer, JobSeeker, JobListing, Application } = require('../models');

const applicationData = require('./applicationData.json');
const employerData = require('./employerData.json');
const jobListingData = require('./JobListingData.json');
const jobSeekerData = require('./jobSeekerData.json');
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
        })
    }

    for (const jobseeker of jobSeekerData) {
        await JobSeeker.create({
            ...jobseeker,

        })
    }

    for (const joblistings of jobListingData) {
        await JobListing.create({
            ...joblistings,
        })
    }

    for (const application of applicationData) {
        await Application.create({
            ...application,
        })
    }

    const user = await JobSeeker.findByPk(1, {
        include: [User, 'applications']
    })
    console.log(user.get({ plain: true }));

    process.exit(0)
}

seedDatabase();