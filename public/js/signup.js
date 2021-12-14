var app = new Vue({
  el: "#signup-form",
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
      lastnameBlured: false,
      age: "",
      ageBlured: false,
      isEmployer: false,
      companyName: "",
      phoneNumber: "",
      license: false,
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
        if (this.isEmployer) {
          if (
            this.validCompanyName(this.companyName) &&
            this.validPhoneNumber(this.phoneNumber)
          ){
            this.valid = true;
          }
        }

        this.valid = true;
      }
    },

    validCompanyName: function (companyName) {
      if (companyName != null && companyName != /s/.test(companyName)) {
        return true;
      }
    },

    validPhoneNumber: function (phoneNumber) {
      if (!isNaN(phoneNumber)) {
        return true;
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
    submit: async function () {
      this.validate();
      if (this.valid) {
        console.log({
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          password: this.password,
          age: this.age,
          isEmployer: this.isEmployer,
          companyName: this.companyName,
          phoneNumber: this.phoneNumber,
          license: this.license
        });

        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify({
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            password: this.password,
            age: this.age,
            isEmployer: this.isEmployer,
            companyName: this.companyName,
            phoneNumber: this.phoneNumber,
            license: this.license
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/profile");
        } else {
          alert(response.statusText);
        }
        this.submitted = true;
      }
    },
  },
});

// const signupFormHandler = async(event) => {

//     const age = document.querySelector('#age-signup').value.trim();
//     const isEmployer = document.querySelector('#isEmployer-signup').value.trim();
//     console.log("ASDASDASDSA")

//     if (firstName && lastName && email && password && age && isEmployer) {

//     }

// };
