function submitUserLoginForm() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const flash = document.querySelector('#flashMessage');
    // server check
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/login", {
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
            sessionStorage.setItem('iti-as1-token', data.token);
            sessionStorage.setItem('iti-as1-username', username);
            location.href = 'dashboard.html';
            
        } else {
            flash.innerHTML = '<h4 class="text-danger">Invalid Username/Password!</h4>';
            flash.innerHTML.style.display = 'block';
        }
    })
    .catch(console.log); 
}