var app = new Vue({
    el: "#profile_candidate",
    data: function () {
      return {
        valid: false,
        submitted: false,
        license: "",
        licenseBlured: false,
      };
    },
  
    methods: {
      validate: function () {
        this.licenseBlured = true;
        if (
          this.validLicense(this.license)
        ) {
          this.valid = true;
        }
      },
  
      validLicense: function (license) {
        if (license != null && license != /s/.test(license)) {
          return true;
        }
      },
  
      
      submit: function () {
        this.validate();
        if (this.valid) {
          this.submitted = true;
        }
      },
    },
  });
  