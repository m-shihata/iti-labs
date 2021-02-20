function submitAdminLoginForm() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const flash = document.querySelector('#flashMessage');
    
    // ONLY THE ADMIN ACCOUNT WILL HAS THE ACCESS
    if(username === 'mushihata' || username === 'ahmedd') {
        // server check
        fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/login", {
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
                // define him as an admin
                sessionStorage.setItem('iti-as1-login', 'admin');
                sessionStorage.setItem('iti-as1-token', data.token)
                location.href = 'dashboard.html'
                flash.innerHTML = "Success Login"
            } else {
                console.log('no token')
                flash.innerHTML = "Invalid Username/Password"
            }
        })
        .catch(console.log); 
    } else {
        document.querySelector('#flashMessage').innerHTML = "Invalid Username/Password"
    }
}