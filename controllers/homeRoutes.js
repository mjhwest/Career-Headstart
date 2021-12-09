const router = require('express').Router();
const { User, Employer, JobListing, JobSeeker, Application } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const jobsData = await JobListing.findAll({
            include: [
                {
                    model: Employer,
                    attributes: ['companyName']
                }
            ]
        });

        const jobs = jobsData.map((job) => job.get({ plain: true }));

        res.render('homepage', {
            jobs,
            logged_in: req.session.logged_in,
            title: "Career HeadStart"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/job/:id', async (req,res) => {
    try {
        const jobsData = await JobListing.findByPk(req.params.id, {
            include: [
                {
                    model: Employer,
                    attributes: ['companyName']
                }
            ]
        });

        const job = jobsData.get({ plain:true });
        res.render('job', {
            ...job,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Application }, { model: JobListing }] 
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/signup', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('signup');
});

module.exports = router;