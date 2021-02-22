document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#c-nav").innerHTML = 
    '<nav id="c-nav" class="navbar navbar-expand-md navbar-light bg-light">' +    
        '<a class="navbar-brand" href="index.html">Anystream</a>' +
        '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">' +
            '<span class="navbar-toggler-icon"></span>' +
        '</button>'+
        '<div class="collapse navbar-collapse" id="navbarText">' +
            '<ul class="navbar-nav">' +
            ((sessionStorage.getItem('iti-as1-login') === 'admin' || sessionStorage.getItem('iti-as1-login') === 'user') ? 
            (
                ( sessionStorage.getItem('iti-as1-login') === 'admin' ?
                    (
                        '<li class="nav-item"><a class="nav-link"  href="addVideo.html">Add Video</a></li>' +
                        '<li class="nav-item"><a class="nav-link"  href="dashboard.html">Dashboard</a></li>'
                    ) : (
                        '<li class="nav-item"><a class="nav-link"  href="dashboard.html">Browse</a></li>')

                ) +
                '<li class="nav-item"><a class="nav-link"  href="editAccount.html">Account Settings</a></li>' +
                '<li class="nav-item"><a class="nav-link"  id="logoutBtn" href="#"  onclick="event.preventDefault(); handleLogout();">Logout</a></li>'
            ) : (
                '<li class="nav-item"><a class="nav-link"  href="userRegister.html">Register</a></li>' +
                '<li class="nav-item"><a class="nav-link"  href="userLogin.html">Login</a></li>'
            )) 
            '</ul>'+
        '</div>' +
    '</nav>'; 
})


function handleLogout() {
    // handle logout fetch and session effect here
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/logout", {
        redirect: 'follow',
        headers: {
            "content-type":"application/json",
            "token": sessionStorage.getItem("iti-as1-login")
        }
    })
    .then(() => {
        sessionStorage.clear();
        location.href = 'index.html'
    })
    .catch(console.log);
}
