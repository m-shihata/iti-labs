function submitEditVideoForm() {
    const title = document.querySelector('#title');
    const id = document.querySelector('#id');
    const type = document.querySelector('#type');
    const category = document.querySelector('#category');
    const images = document.querySelector('#images');
    const sources = document.querySelector('#sources');
    const subtitles = document.querySelector('#subtitles');

    fetch(`https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/80/videos/${sessionStorage.getItem('iti-video-id')}`, {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({
            title: title.value,
            url: {
                id: id.value,
                type: type.value,
                category: category.value,
                images: parse(images.value),
                sources: parse(sources.value),
                subtitles: parse(subtitles.value)
            }
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
            title.value = '';
            id.value = '';
            category.value = '';
            type.value = '';
            images.value = '';
            sources.value = '';
        }  
    })
    .catch(console.log);
}

function parse(s) {
    return s.substr(1, s.length-2).split(/\s*,\s*/);
}
