if (sessionStorage.getItem("iti-as1-login") === 'admin') {
    document.querySelector('#contentWrapper').style.display = 'block';
} else {
    document.querySelector('#flashMessage').innerHTML = '<div><div class="text-danger font-weight-bold">Not Allowed!</div><br><a href="adminLogin.html">Please, Login First<a></div>'
    document.querySelector('#flashMessage').style.display = 'block';
}