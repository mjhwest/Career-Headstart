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

Employer.hasMany(JobListing, {
    foreignKey: 'listed_by',
    onDelete: 'CASCADE'
});

JobListing.belongsTo(Employer, {
    foreignKey: 'listed_by'
});

// ---------------------------------------------

JobSeeker.belongsToMany(JobListing, {
    through: {
        model: Application,
        unique: true,
    },
    as: 'applications',
    foreignKey: 'applicant_id'
});

JobListing.belongsToMany(JobSeeker, {
    through: {
        model: Application,
        unique: true,
    },
    as: 'applicants',
    foreignKey: 'listing_id'
});

// ---------------------------------------------

module.exports = { User, Employer, JobSeeker, JobListing, Application }