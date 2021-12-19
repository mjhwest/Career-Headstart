var app = new Vue({
  el: "#profile_employer",
  data: function () {
    return {
      valid: false,
      submitted: false,
      companyname: "",
      companynameBlured: false,
      phonenumber: "",
      phonenumberBlured: false,
      firstname: "",
      firstnameBlured: false,
      lastname: "",
      lastnameBlured: false,
      email: "",
      emailBlured: false,
    };
  },

  methods: {
    validate: function () {
      this.companynameBlured = true;
      this.phonenumberBlured = true;
      this.firstnameBlured = true;
      this.lastnameBlured = true;
      this.emailBlured = true;

      if (
        this.validCompanyname(this.companyname) &&
        this.validPhonenumber(this.phonenumber) &&
        this.validEmail(this.email) &&
        this.validFirstname(this.firstname) &&
        this.validLastname(this.lastname)
      ) {
        this.valid = true;
      }
    },

    validCompanyname: function (companyname) {
      if (companyname != null && companyname != /s/.test(companyname)) {
        return true;
      }
    },

    validPhonenumber: function (phonenumber) {
      if (phonenumber != null && phonenumber != /s/.test(phonenumber)) {
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
            phoneNumber: this.phonenumber,
            companyName: this.companyname,
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
