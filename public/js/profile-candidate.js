var app = new Vue({
  el: "#profile_candidate",
  data: function () {
    return {
      valid: false,
      submitted: false,
      firstname: "",
      firstnameBlured: false,
      lastname: "",
      lastnameBlured: false,
      email: "",
      emailBlured: false,
      license: "",
      licenseBlured: false,
    };
  },

  methods: {
    validate: function () {
      this.licenseBlured = true;
      this.firstnameBlured = true;
      this.lastnameBlured = true;
      this.emailBlured = true;

      if (
        this.validLicense(this.license) &&
        this.validEmail(this.email) &&
        this.validFirstname(this.firstname) &&
        this.validLastname(this.lastname)
      ) {
        this.valid = true;
      }
    },

    validLicense: function (license) {
      if (license != null && license != /s/.test(license)) {
        return true;
      }
    },

    validFirstname: function (firstname) {
      if (firstname != null && firstname != /s/.test(firstname)) {
        return true;
      }
    },

    validLastname: function (lastname) {
      if (lastname != null && lastname != /s/.test(lastname)) {
        return true;
      }
    },

    validEmail: function (email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
    },

    submit: async function () {
      this.validate();
      if (this.valid) {
        const response = await fetch("/api/users/profile", {
          method: "PUT",
          body: JSON.stringify({
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            license: this.license,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }

        this.submitted = true;
      }
    },
  },
});
