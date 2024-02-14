function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword){
        registerUser(username, password);
    } else {
        alert('Lozinke se ne podudaraju!');
    }
}

function registerUser(username, password) {
    $.ajax({
        url: 'https://www.fulek.com/data/api/user/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function(data) {
            console.log('Response Data:', data);
            if (data.isSuccess) {
                alert('Korisnik je uspješno registriran!');
            } else {
                console.log('Error Messages:', data.errorMessages);
                alert('Došlo je do pogreške!');
            }
        },
        error: function(error) {
            console.log(error);
            alert('Došlo je do pogreške!');
        }
    });
}