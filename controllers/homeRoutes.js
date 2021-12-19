const router = require("express").Router();
const {
  User,
  Employer,
  JobListing,
  JobSeeker,
  Application,
} = require("../models");
const withAuth = require("../utils/auth");
require("../utils/helpers");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const jobsData = await JobListing.findAll({
      include: [
        {
          model: Employer,
          attributes: ["companyName"],
        },
      ],
    });

    const jobs = jobsData.map((job) => job.get({ plain: true }));
    res.render("homepage", {
      jobs,
      logged_in: req.session.logged_in,
      title: "Career HeadStart",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobsData = await JobListing.findAll({
      include: [
        {
          model: Employer,
          attributes: ["companyName"],
        },
      ],
    });
    const jobs = jobsData.map((job) => job.get({ plain: true }));

    res.render("job", {
      jobs,
      logged_in: req.session.logged_in,
      title: "Career HeadStart | Jobs",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/job/:id", withAuth, async (req, res) => {
  try {
    const jobsData = await JobListing.findByPk(req.params.id, {
      include: [{ model: Employer }],
    });

    const job = jobsData.get({ plain: true });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: JobSeeker }],
    });

    const user = userData.get({ plain: true });
    console.log(job);
    console.log(user);
    res.render("job", {
      ...job,
      ...user,
      logged_in: req.session.logged_in,
      title: job.jobTitle,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: JobSeeker }, { model: Employer }],
    });

    const user = userData.get({ plain: true });

    if (user.isEmployer) {
      res.render("profile-employer", {
        ...user,
        logged_in: true,
      });
    } else {
      res.render("profile-jobseeker", {
        ...user,
        logged_in: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: JobSeeker,
          include: [
            {
              model: JobListing,
              as: "applications",
            },
          ],
        },
        {
          model: Employer,
          include: [
            {
              model: JobListing,
            },
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });

    if (user.isEmployer) {
      const joblisting = user.employer.joblistings;

      const applicationData = await Application.findAll({
        include: [
          {
            model: JobListing,
          },
        ],
        where: { listed_by: user.employer.id },
        attributes: [
          "listing_id",
          [
            sequelize.fn("count", sequelize.col("applicant_id")),
            "total_amount",
          ],
        ],
        group: ["listing_id"],
        raw: true,
        nest: true,
      });
      console.log(applicationData);

      let total = 0;
      if (applicationData === null) {
        total = 0;
      }

      res.render("dashEmployer", {
        ...user,
        applicationData: applicationData,
        joblisting: joblisting,
        companyName: user.employer.companyName,
        logged_in: true,
        title: "Dashboard",
      });
    } else {
      const application = user.jobseeker.applications;
      console.log(application);
      res.render("dashJobSeeker", {
        ...user,
        application: application,
        logged_in: true,
        title: "Dashboard",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("post", {
      ...user,
      logged_in: req.session.logged_in,
      title: "Post a job",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("signup");
});

module.exports = router;
