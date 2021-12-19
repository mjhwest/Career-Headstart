const router = require("express").Router();
const { Employer, JobSeeker, Application, User } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    if (req.body.isEmployer) {
      try {
        const employerData = await Employer.create(req.body);
        await userData.setEmployer(employerData);
      } catch (err) {
        userData.destroy();
        throw err;
      }
    } else {
      try {
        const jobSeekerData = await JobSeeker.create(req.body);
        await userData.setJobseeker(jobSeekerData);
      } catch (err) {
        userData.destroy();
        throw err;
      }
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/profile", async (req, res) => {
  console.log(req.body);
  try {
    var query = {
      where: { id: req.session.user_id },
      include: [{ model: Employer }],
    };

    const userData = await User.findOne(query);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.isEmployer) {
      Employer.update(
        {
          phoneNumber: req.body.phoneNumber,
          companyName: req.body.companyName,
        },
        {
          where: {
            id: user.employer.id,
          },
        }
      ),
        User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          },
          {
            where: {
              id: req.session.user_id,
            },
          }
        );
    } else {
      var query = {
        where: { id: req.session.user_id },
        include: [{ model: JobSeeker }],
      };

      const userData = await User.findOne(query);
      const user = userData.get({ plain: true });

      JobSeeker.update(
        {
          license: req.body.license,
        },
        {
          where: {
            id: user.jobseeker.id,
          },
        }
      ),
        User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          },
          {
            where: {
              id: req.session.user_id,
            },
          }
        );
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
