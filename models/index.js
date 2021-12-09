const User = require('./User');
const Employer = require('./Employer');
const JobSeeker = require('./JobSeeker');
const JobListing = require('./JobListing');
const Application = require('./Application');

// ---------------------------------------------
Employer.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

JobSeeker.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

JobSeeker.hasMany(Application, {
    foreignKey: 'applicant_id',
    onDelete: 'CASCADE'
});

Application.belongsTo(JobSeeker, {
    foreignKey: 'applicant_id'
});

Employer.hasMany(JobListing, {
    foreignKey: 'listed_by',
    onDelete: 'CASCADE'
});

JobListing.belongsTo(Employer, {
    foreignKey: 'listed_by'
});

JobListing.hasMany(Application, {
    foreignKey: 'listing_id',
    onDelete: 'CASCADE'
});

Application.belongsTo(JobListing, {
    foreignKey: 'listing_id'
})


module.exports = { User, Employer, JobSeeker, JobListing, Application }