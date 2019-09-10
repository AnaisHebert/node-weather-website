const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('/weather?address='+location).then((response) => {
        response.json().then(({ error, location, forecast }) => {
            if(error) {
                message1.textContent = error;
                
            } else {
                message1.textContent = location;
                message2.textContent = forecast;
            }
        });
    });
});