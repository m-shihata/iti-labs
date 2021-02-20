document.addEventListener('DOMContentLoaded', () => {
    // Load navigator items depend on who is logged in
    if (sessionStorage.getItem('iti-as1-login') === 'admin') {
        // Login as an admin
        document.querySelector("#c-nav").innerHTML = 
            '<ul>' +
                '<li><a href="index.html">Home</a></li>' +
                '<li><a href="addVideo.html">Add Video</a></li>' +
                '<li><a href="dashboard.html">Dashboard</a></li>' +
                '<li><a href="editAccount.html">Account Settings</a></li>' +
                '<li><a href="#" onclick="event.preventDefault(); handleLogout();">Logout</a></li>' +
            '</ul>';
    } else if (sessionStorage.getItem('iti-as1-login') === 'user') {
        // Not login
        document.querySelector("#c-nav").innerHTML = 
            '<ul>' +
                '<li><a href="browse.html">Browse</a></li>' +
                '<li><a href="editAccount.html">Account Settings</a></li>' +
                '<li><a id="logoutBtn" href="#"  onclick="event.preventDefault(); handleLogout();">Logout</a></li>' +
            '</ul>';  
    } else {
        // Login as anyone
        document.querySelector("#c-nav").innerHTML =
            '<ul>' +
                '<li><a href="index.html">Home</a></li>' +
                '<li><a href="adminLogin.html">Admin Login </a></li>' +
                '<li><a href="userLogin.html">User Login</a></li>' +
                '<li><a href="userRegister.html">User Register</a></li>' +
            '</ul>'; 
    }

    

})

function handleLogout() {
    // handle logout fetch and session effect here
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/logout", {
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
