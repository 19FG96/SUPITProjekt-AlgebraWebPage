document.getElementById('kontakt').addEventListener('click', function() {
    document.getElementById('kontaktModal').style.display = 'block';
});

function closeModal() {
    
    document.getElementById('kontaktModal').style.display = 'none';
}

document.querySelector('.close-button').addEventListener('click', function() {
    closeModal();
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    sendMail();
    closeModal();
});



function sendMail(){
    $.ajax({
        url: 'https://www.fulek.com/mvc/supit/project-contact-form',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            Fullname: document.getElementById('FullName').value,
            Email: document.getElementById('Email').value,
            Importance: document.getElementById('Importance').value,
            ReceiveNewsLetter: document.getElementById('ReceiveNewsletter').checked,
            Message: document.getElementById('Message').value
        }),
        success: function(data) {
            console.log('Response Data:', data);
            if (data.isSuccess) {
                alert('Poruka je uspješno poslana!');
            } else {
                console.log('Error Messages:', data.errorMessages);
                alert('Došlo je do pogreške, poruka nije poslana!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('AJAX error:', textStatus, errorThrown);
        }
    });
}