var app = new Vue({
  el: "#jobpostForm",
  data: function () {
    return {
      valid: false,
      submitted: false,
      jobTitle: "",
      jobTitleBlured: false,
      jobDescript: "",
      jobDescriptBlured: false,
      jobLocation: "",
      jobLocationBlured: false,
      jobWage: "",
      jobWageBlured: false,
      industry: "",
      industryBlured: false,
      experience: "",
      experienceBlured: false,
      qualification: "",
      qualificationBlured: false,
      workLoad: "",
    };
  },

  methods: {
    validate: function () {
      this.jobTitleBlured = true;
      this.jobDescriptBlured = true;
      this.jobLocationBlured = true;
      this.jobWageBlured = true;
      this.industryBlured = true;
      this.experienceBlured = true;
      this.qualificationBlured = true;
      if (
        this.validJobtitle(this.jobTitle) &&
        this.validJobdescription(this.jobDescript) &&
        this.validWage(this.jobWage) &&
        this.validLocation(this.jobLocation) &&
        this.validindustry(this.industry) &&
        this.validexperience(this.experience) &&
        this.validqualification(this.qualification)
      ) {
        this.valid = true;
      }
    },

    validJobtitle: function (jobTitle) {
      if (jobTitle != null && jobTitle != /s/.test(jobTitle)) {
        return true;
      }
    },

    validJobdescription: function (jobDescript) {
      if (jobDescript != null && jobDescript != /s/.test(jobDescript)) {
        return true;
      }
    },

    validWage: function (jobWage) {
      if (!isNaN(jobWage)) {
        return true;
      }
    },

    validLocation: function (jobLocation) {
      if (jobLocation != null && jobLocation != /s/.test(jobLocation)) {
        return true;
      }
    },
    validindustry: function (industry) {
      if (industry != null && industry != /s/.test(industry)) {
        return true;
      }
    },
    validexperience: function (experience) {
      if (experience != null && experience != /s/.test(experience)) {
        return true;
      }
    },
    validqualification: function (qualification) {
      if (qualification != null && qualification != /s/.test(qualification)) {
        return true;
      }
    },
    submit: async function () {
      this.validate();
      if (this.valid) {
        const response = await fetch("/api/job/post", {
          method: "POST",
          body: JSON.stringify({
            jobTitle: this.jobTitle,
            jobDescript: this.jobDescript,
            jobWage: this.jobWage,
            jobLocation: this.jobLocation,
            industry: this.industry,
            experience: this.experience,
            qualification: this.qualification,
            workLoad: this.workLoad,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert(response.statusText);
        }

        this.submitted = true;
      }
    },
  },
});
