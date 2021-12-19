const router = require("express").Router();
const {
  JobListing,
  Application,
  JobSeeker,
  User,
  Employer,
} = require("../../models");
const withAuth = require("../../utils/auth");
const sendApplicationAlert = require("../../nodemail");

router.post("/", withAuth, async (req, res) => {
  try {
    const newJob = await JobListing.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    console.log(req.body);

    var query = {
      where: { id: req.session.user_id },
      include: [{ model: Employer }],
    };

    const userData = await User.findOne(query);
    const user = userData.get({ plain: true });
    console.log(user);
    const jobData = await JobListing.create({
      ...req.body,
      listed_by: user.employer.id,
    });

    res.status(200).json(jobData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/application/:id", async (req, res) => {
  try {
    var query = {
      where: { id: req.session.user_id },
      include: [{ model: JobSeeker }],
    };

    const userData = await User.findOne(query);
    const user = userData.get({ plain: true });

    const newApplication = await Application.create({
      applicant_id: user.jobseeker.id,
      listing_id: parseInt(req.params.id),
    });
    // sendApplicationAlert(newApplication.id);
    res.status(200).json(newApplication);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    var query = {
      where: { id: req.session.user_id },
      include: [{ model: Employer }],
    };

    const userData = await User.findOne(query);
    const user = userData.get({ plain: true });

    console.log(req.body);
    console.log(user.employer.id);
    const jobData = await JobListing.destroy({
      where: {
        id: req.body.id,
        listed_by: user.employer.id,
      },
    });

    if (!jobData) {
      res.status(404).json({ message: "No job listing found with this ID!" });
      return;
    }

    res.status(200).json(jobData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
