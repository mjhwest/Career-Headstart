var parameter = window.location.pathname.split("/");
var result = parameter.pop();

const newApplicationHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/job/application/' + result, {
        method: 'POST',
        body:JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to send application');
    }
}

document
    .querySelector('#apply')
    .addEventListener('click', newApplicationHandler)

