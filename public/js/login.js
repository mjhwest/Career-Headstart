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
      };
    },
  
    methods: {
      validate: function () {
        this.emailBlured = true;
        this.passwordBlured = true;
  
        if (
          this.validEmail(this.email) &&
          this.validPassword(this.password) 
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
  
      submit: async function () {
        this.validate();
        if (this.valid) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email: this.email, password: this.password }),
            headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
            } else {
            alert("Invalid email or password, please try again");
            }
          this.submitted = true;
        }
      },
    },
  });
  
