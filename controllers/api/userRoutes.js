const router = require('express').Router();
const { Employer, JobSeeker } = require('../../models');
const { create } = require('../../models/User');
const User = require('../../models/User');

router.post('/signup', async(req, res) => {
    try {

        const userData = await User.create(req.body);

        if (req.body.isEmployer){
            try {
            const employerData = await Employer.create(req.body)
            await userData.setEmployer(employerData)

            } catch(err) {
                userData.destroy();
                throw(err);
            }

        } else {
            try {
                const jobSeekerData = await JobSeeker.create(req.body)
                await userData.setJobseeker(jobSeekerData)
    
                } catch(err) {
                    userData.destroy();
                    throw(err);
                }
        }
        const createdUser = await User.findByPk(userData.id,{
            include: [
                Employer,JobSeeker
            ]
        })

        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;