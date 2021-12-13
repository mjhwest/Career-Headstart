var app = new Vue({
  el: "#form1",
  data: function () {
    return {
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      password: "",
      passwordBlured: false,
      firstname: "",
      firstnameBlured: false,
      lastname: "",
      lasttnameBlured: false,
      age: "",
      ageBlured: false,
    };
  },

  methods: {
    validate: function () {
      this.emailBlured = true;
      this.passwordBlured = true;
      this.firstnameBlured = true;
      this.lastnameBlured = true;
      this.ageBlured = true;
      if (
        this.validEmail(this.email) &&
        this.validPassword(this.password) &&
        this.validAge(this.age) &&
        this.validFirstname(this.firstname) &&
        this.validLastname(this.lastname)
      ) {
        this.valid = true;
      }
    },

    validEmail: function (email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
    },

    validPassword: function (password) {
      if (password.length > 7) {
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

    validAge: function (age) {
      if (age > 17) {
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
