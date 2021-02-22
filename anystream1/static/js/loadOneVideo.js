(function() {
    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/videos/${sessionStorage.getItem('iti-video-id')}`, {
    redirect: 'follow',
    headers: {
        "content-type":"application/json",
        "token": sessionStorage.getItem("iti-as1-token")
    }
    })
    .then(res => res.json())
    .then(obj => {
        console.log(obj)
        if (obj.error) {
            console.log(obj.error)
        }
        else if (document.title === 'Edit Video') {
            document.querySelector('#id').value = obj.data.url.id || '';
            document.querySelector('#title').value = obj.data.title || '';
            document.querySelector('#type').value = obj.data.url.type || '';
            document.querySelector('#category').value = obj.data.url.category || '';
            document.querySelector('#sources').value = `[${obj.data.url.sources}]` || '';
            document.querySelector('#images').value = `[${obj.data.url.images}]` || '';
            document.querySelector('#subtitles').value = `[${obj.data.url.subtitles}]` || '';
        }  
    })
    .catch(console.log);
})();

function parse(s) {
    return s.substr(1, s.length-2).split(/\s*,\s*/);
}