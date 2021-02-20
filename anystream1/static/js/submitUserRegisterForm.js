function submitUserRegisterForm() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const flash = document.querySelector('#flashMessage');
    // server check
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/register", {
        method: 'POST',
        body: JSON.stringify({ 
            "username": username, 
            "password": password
        }),
        redirect: 'follow',
        headers: {
            "content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        // if it returns a token then ok
        if (data.token) {
            // define him as a user
            sessionStorage.setItem('iti-as1-login', 'user');
            sessionStorage.setItem('iti-as1-token', data.token)
            location.href('dashboard.html')
        } else if (data.error){
            flash.innerHTML = data.error;
        } else {
            flash.innerHTML = "Sorry, something wrong happened! Try again."
        }
    })
    .catch(console.log); 
}