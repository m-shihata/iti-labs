(function() {
    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/${sessionStorage.getItem('iti-video-id')}`, {
    redirect: 'follow',
    headers: {
        "content-type":"application/json",
        "token": sessionStorage.getItem("iti-as1-token")
    }
    })
    .then(res => res.json())
    .then(video => {
        console.log(video)
        if (video.error) {
            console.log(video.error)
        }
        else if (document.title === 'Edit Video') {
            document.querySelector('#videoId').value = video.data.id;
            document.querySelector('#videoTitle').value = video.data.title;
            document.querySelector('#videoURL').value = video.data.url;
        }  
    })
    .catch(console.log);
})();