// set intial token
if (!sessionStorage.getItem('iti-as1-login')) {
    
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/login", {
        method: 'POST',
        body: JSON.stringify({ 
            "username": 'dummy', 
            "password": 'dummy'
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
            // just set token
            sessionStorage.setItem('iti-as1-token', data.token)
            loadAllVideos();
        }
    })
    .catch(console.log);    
} else {
    loadAllVideos();
}

function loadAllVideos() {
    const flash = document.querySelector('#flashMessage');
    const allVideos = document.querySelector('#allVideos');
    allVideos.innerHTML = '<div><span class="h3">Videos are Loading...</span><span class="spinner-border"></span></div>'

    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/", {
        redirect: 'follow',
        headers: {
            "content-type":"application/json",
            "token": sessionStorage.getItem("iti-as1-token")
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.error) {
            flash.innerHTML= data.error
        } else {
            allVideos.innerHTML = ''
            if (allVideosReversed) {
                data.forEach(el => {
                    loadCard(el);
                });
            } else {
                for(let i = data.length - 1; i !== 0; i--) {
                    loadCard(data[i]);
                }
            }
            
        }
    })
    .catch(console.log)
}


function loadCard(c) {
    div = document.createElement('div') 
    div.setAttribute('id', `card${c.id}`)
    div.innerHTML =
            `<span class="h1">${c.id}: ${c.title}</span>` +
            ( sessionStorage.getItem('iti-as1-login') === 'admin' ? 
            (`<button class="btn btn-sm btn-outline-primary" onclick="editVideo(${c.id});">Edit</button>` +
            `<button class="btn btn-sm btn-outline-danger" onclick="deleteVideo(${c.id});">Delete</button>`) : '') +
            `<div><img src=${c.url}></div>`;
    allVideos.appendChild(div)
}

function editVideo(id) {
    sessionStorage.setItem('iti-video-id', id);
    location.href = 'editVideo.html'
}

function deleteVideo(id) {
    // fetch to delete 
    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/${id}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
            "content-type":"application/json",
            "token": sessionStorage.getItem("iti-as1-token")
        }
    })
    .then(res => res.json())
    .then(() => {
        // hide from UI 
        document.querySelector(`#card${c.id}`).style.display = 'none';
    })
    .catch(console.log);
}


// console.log('loadAllVideos.js loaded!')