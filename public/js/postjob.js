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
      workLoad: "",
    };
  },

  methods: {
    validate: function () {
      this.jobTitleBlured = true;
      this.jobDescriptBlured = true;
      this.jobLocationBlured = true;
      this.jobWageBlured = true;
      if (
        this.validJobtitle(this.jobTitle) &&
        this.validJobdescription(this.jobDescript) &&
        this.validWage(this.jobWage) &&
        this.validLocation(this.jobLocation)
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
      //   if (!isNaN(jobWage)) {
      //     return true;
      //   }
      if (jobWage != null && jobWage != /s/.test(jobWage)) {
        return true;
      }
    },

    validLocation: function (jobLocation) {
      if (jobLocation != null && jobLocation != /s/.test(jobLocation)) {
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
