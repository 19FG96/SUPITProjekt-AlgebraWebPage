function logIn (){
    document.getElementById('login-form').addEventListener('submit', function(event){
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        loginUser(username, password);
    });
}

function loginUser (username, password){
    $.ajax({
        url: 'https://www.fulek.com/data/api/user/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function(data) {
            console.log('Login Response Data:', data); // Logdata object
            console.log('Login Response Data Data:', data.data); // Log data.data object (tu je prava data)
            if (data.isSuccess) {
                alert('Korisnik je uspješno prijavljen!');
                localStorage.setItem('token', data.data.token);
                window.location.href = '../pages/nastavniPlan.html';
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

