const User = require('./User');
const Employer = require('./Employer');
const JobSeeker = require('./JobSeeker');
const JobListing = require('./JobListing');
const Application = require('./Application');

// ---------------------------------------------
User.hasOne(Employer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Employer.belongsTo(User, {
    foreignKey: 'user_id',
});

// ---------------------------------------------
User.hasOne(JobSeeker, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

JobSeeker.belongsTo(User, {
    foreignKey: 'user_id',
});

// ---------------------------------------------

JobSeeker.belongsToMany(JobListing, {
    through: {
        model: Application,
        unique: true
    },
    as: 'application_jobseeker'
});

JobListing.belongsToMany(JobSeeker, {
    through: {
        model: Application,
        unique: true
    },
    as : 'application_joblisting'
});

// ---------------------------------------------

// Employer.hasMany(Application, {
//     trough: {
//         model: JobListing,
//         unique: true
//     },
//     as: 'job_listing'
// });

// Application.belongsTo(Employer, {
//     trough: {
//         model: JobListing,
//         unique: true,
//     },
//     as: 'job_applicant'
// });


// ---------------------------------------------
Employer.hasMany(JobListing, {
    foreignKey: 'listed_by',
    onDelete: 'CASCADE'
});

JobListing.belongsTo(Employer, {
    foreignKey: 'listed_by'
});

// JobListing.hasMany(Application, {
//     foreignKey: 'listing_id',
//     onDelete: 'CASCADE'
// });

// Application.belongsTo(JobListing, {
//     foreignKey: 'listing_id'
// })


module.exports = { User, Employer, JobSeeker, JobListing, Application }