console.log('Client-side code running');

const button = document.getElementById('btnTranslate');

button.addEventListener('click', function (e) {
    console.log('button was clicked');
    txtIn = document.getElementById('textIn').value;
    fetch('/' + txtIn, {method: 'GET'})
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function (data) {
            document.getElementById('txtOut').innerHTML = data;
        })
        .catch(function (error) {
            console.log(error);
        });
});