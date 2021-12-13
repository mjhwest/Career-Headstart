const signupFormHandler = async(event) => {
    event.preventDefault();

    const firstName = document.querySelector('.firstname-signup').value.trim();
    const lastName = document.querySelector('.lastname-signup').value.trim();
    const email = document.querySelector('.email-signup').value.trim();
    const password = document.querySelector('.password-signup').value.trim();
    const age = 20
    const isEmployer = true


    if (firstName && lastName && email && password && age) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password, age, isEmployer }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
    console.log(users)
};

document
    .querySelector('.signup-btn')
    .addEventListener('click', signupFormHandler);