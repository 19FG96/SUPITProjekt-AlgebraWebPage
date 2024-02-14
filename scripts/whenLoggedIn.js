function updateNavbar() {
    const token = localStorage.getItem('token');

    if (token) {
        // mijenja "Prijavi se" u "Odjavi se"
        const loginLink = document.getElementById('prijavi-se');
        loginLink.innerHTML = '<span style="color: orange;"><i class="fa fa-sign-out" aria-hidden="true"></i></span> Odjavi se';

        loginLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default
            logOut();
        });

        // nastavni plan
        const nastavniPlanLink = document.createElement('a');
        
        nastavniPlanLink.href = 'nastavniPlan.html';
        nastavniPlanLink.innerHTML = '<i class="fa fa-book" aria-hidden="true"></i> Nastavni plan';

        const navbarGroup = document.querySelector('.navbar-group.left');
        navbarGroup.insertBefore(nastavniPlanLink, navbarGroup.childNodes[2]);
    }
}


function logOut() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}



window.addEventListener('load', updateNavbar);