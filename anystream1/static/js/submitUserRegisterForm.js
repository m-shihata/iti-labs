function submitUserRegisterForm() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const passwordAgain = document.querySelector('#passwordAgain').value;
    const flash = document.querySelector('#flashMessage');
    if (password === passwordAgain) {
        // server check
        fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/register", {
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
                sessionStorage.setItem('iti-as1-username', username)
                location.href = 'dashboard.html'
            } else if (data.error){
                flash.innerHTML = `<h4 class="text-danger">${data.error}</h4>`;
                flash.style.display = 'block';
            }
        })
        .catch(console.log); 
    } else {
        flash.innerHTML = `<h4 class="text-danger">Passwords doesn't match!</h4>`;
        flash.style.display = 'block';
        
    }
}