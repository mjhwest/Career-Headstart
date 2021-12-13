var app = new Vue({
    el: "#form1",
    data: function() {
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
        validate: function() {
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

        validEmail: function(email) {
            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if (re.test(email.toLowerCase())) {
                return true;
            }
        },

        validPassword: function(password) {
            if (password.length > 7) {
                return true;
            }
        },

        validFirstname: function(firstname) {
            if (firstname != null && firstname != /s/.test(firstname)) {
                return true;
            }
        },

        validLastname: function(lastname) {
            if (lastname != null && lastname != /s/.test(lastname)) {
                return true;
            }
        },

        validAge: function(age) {
            if (age > 17) {
                return true;
            }
        },
        submit: function() {
            this.validate();
            if (this.valid) {
                this.submitted = true;
            }
        },
    },
});


// ------------------------------------LOGIN AND SIGNUP -----------------------------------------------------------------------------//

const loginFormHandler = async(event) => {
    event.preventDefault();

    // Collect values from the login form - VALUES TO BE USERNAME and PASSWORD 
    const email = document.querySelector('.email-login').value.trim();
    const password = document.querySelector('.password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};



document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);