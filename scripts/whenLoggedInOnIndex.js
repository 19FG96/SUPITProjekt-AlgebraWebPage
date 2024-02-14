function updateNavbar() {
    const token = localStorage.getItem('token');

    if (token) {
        // "Prijavi se" u "Odjavi se"
        const loginLink = document.getElementById('prijavi-se');
        loginLink.innerHTML = '<span style="color: orange;"><i class="fa fa-sign-out" aria-hidden="true"></i></span> Odjavi se';

        loginLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action
            logOut();
        });

        // "Nastavni plan"
        const nastavniPlanLink = document.createElement('a');
        nastavniPlanLink.href = 'pages/nastavniPlan.html';
        nastavniPlanLink.innerHTML = '<i class="fa fa-book" aria-hidden="true"></i> Nastavni plan';

        const navbarGroup = document.querySelector('.navbar');
        // navbarGroup.insertBefore(nastavniPlanLink, navbarGroup.childNodes[2]); - ovo ne radi jer poremeti sav navbar
        navbarGroup.appendChild(nastavniPlanLink); // dodaje nastavni plan link unavbar
    }
}


function logOut() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}


window.addEventListener('load', updateNavbar);