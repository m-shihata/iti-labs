function submitEditVideoForm() {
    const videoURL = document.querySelector('#videoURL')
    const videoTitle = document.querySelector('#videoTitle')
    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/78/videos/${sessionStorage.getItem('iti-video-id')}`, {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({
            "url": videoURL.value,
            "title": videoTitle.value
        }),
        headers: {
            "content-type":"application/json",
            "token": sessionStorage.getItem("iti-as1-token")
        }
    })
    .then(res => res.json())
    .then(data => {
        const flash = document.querySelector('#flashMessage')
        if (data.error) {
            flash.innerHTML = data.error
        } else if (data.success) {
            flash.innerHTML = data.success;
            videoURL.value = '';
            videoTitle.value = '';
        }  
    })
    .catch(console.log);
}