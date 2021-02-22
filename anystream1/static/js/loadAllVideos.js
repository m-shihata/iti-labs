// set intial token
if (!sessionStorage.getItem('iti-as1-login')) {
    
    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/login", {
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

    fetch("https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/videos/", {
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
                for(let i = data.length - 1; i > -1; i--) {
                    loadCard(data[i]);
                }
            }
            
        }
    })
    .catch(console.log)
    
}


function loadCard(data) {
    for (let i = 0; i < videosNum; i++ ) { // just for styling 
        div = document.createElement('div') 
        div.setAttribute('id', `card${data.id}`)
        div.setAttribute('class', 'mt-5')
        div.innerHTML =
                `<div class="h5 mb-2">${data.title}</div>` +
                `<div><img class="rounded" onclick="openInPlayer(${data.id})" style="width: 250px" src=${data.url.images[0]}></div>`+
                ( sessionStorage.getItem('iti-as1-login') === 'admin' ? 
                (`<div><button class="btn btn-sm btn-outline-secondary mr-2 mt-2" onclick="editVideo(${data.id});">Edit</button>` +
                `<button class="btn btn-sm btn-outline-secondary mt-2" onclick="deleteVideo(${data.id});">Delete</button></div>`) : '');
        allVideos.appendChild(div)
    }
}

function openInPlayer(id) {
    sessionStorage.setItem('iti-video-id', id);
    location.href = 'player.html';
}

function editVideo(id) {
    sessionStorage.setItem('iti-video-id', id);
    location.href = 'editVideo.html'
}

function deleteVideo(id) {
    // fetch to delete 
    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/videos/${id}`, {
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
        document.querySelector(`#card${id}`).style.display = 'none';
    })
    .catch(console.log);
}

function parse(s) {
    return s.substr(1, s.length-2).split(/\s*,\s*/);
}

// console.log('loadAllVideos.js loaded!')