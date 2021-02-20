if (sessionStorage.getItem("iti-as1-login") === 'admin') {
    document.querySelector('#contentWrapper').style.display = 'block';
} else {
    document.querySelector('#flashMessage').innerHTML = '<h1>Not Allowed</h1>'
}
