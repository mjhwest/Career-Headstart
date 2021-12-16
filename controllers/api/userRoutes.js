const router = require('express').Router();
const { Employer, JobSeeker, Application } = require('../../models');
const { create } = require('../../models/User');
const User = require('../../models/User');
const sendApplicationAlert = require('../../nodemail');


//need to test
router.post('/job/:id', async(req, res) => {
    try {
        const newApplication = await Application.create({
            applicant_id: req.session.user_id,
            listing_id: req.params.id
        })
        sendApplicationAlert(newApplication.id)
        res.status(200).json(newApplication);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/signup', async(req, res) => {
    try {

        const userData = await User.create(req.body);

        if (req.body.isEmployer) {
            try {
                const employerData = await Employer.create(req.body)
                await userData.setEmployer(employerData)

            } catch (err) {
                userData.destroy();
                throw (err);
            }

        } else {
            try {
                const jobSeekerData = await JobSeeker.create(req.body)
                await userData.setJobseeker(jobSeekerData)

            } catch (err) {
                userData.destroy();
                throw (err);
            }
        }
        const createdUser = await User.findByPk(userData.id, {
            include: [
                Employer, JobSeeker
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







// update a profile name by its `id` valu
//working
// router.put('/:id', (req, res) => {
//     Tag.update({
//             tag_name: req.body.tag_name,
//         }, {
//             where: {
//                 id: req.params.id,
//             },
//         })
//         .then((updatedTag) => {
//             res.json(updatedTag);
//         })
//         .catch((err) => res.json(err));
// });