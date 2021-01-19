
// Global variable for the volume
var v = 5;

// Make the code run only after document loaded
document.addEventListener('DOMContentLoaded', () => {

    // Elements 
    const player = document.querySelector('#player');
    const video = document.querySelector('#video');
    const title = document.querySelector('#title');
    const allowedAge = document.querySelector('#allowedAge');
    const cats = document.querySelector('#cats');
    const subtitles = document.querySelector('#subtitles');
    const seekbarContWidth = seekbarCont.clientWidth;
    const playPauseBtn = document.querySelector('#palyPauseBtn');

    const volumeRange = document.querySelector('#volumeRange');

    // Set volume to be .5 by default
    video.volume = .5; 

    // Fetch for the data with ID -> will be right here
    // Only after the fetch is done load this functions ...
    // Append video sources -> form data.js
    appendVideoSources(video, data.sources);

    loadMeta(data.meta);        // load meta data
    // loadDefaultSub();        // load the default subtitle track
    // loadDefaultAudio();      // load the default audio track


    // Set event listeners -> will be out of the fetch chain
    // add eventListeners on all of the UI buttons
    document.querySelectorAll('.controlBtn').forEach((el) => {
        // function name of the button
        const f = el.dataset.f;

        // add event listner to the button to run his function
        el.setAttribute('onclick', `${f}()`);
    });


    // add eventListeners on all of the UI Range Inputs
    document.querySelectorAll('.controlRange').forEach((el) => {
        // function name of the range input
        const f = el.dataset.f;
        // add event listner to the button to run his function
        el.setAttribute('oninput', `${f}(event)`);
    });
    
    // Keyboard event listeners
    document.addEventListener('keyup', (e) => {
        if(e.key==' '){
            playPause();
        } else if(e.key=='ArrowRight') {
            forwardTen();
        } else if(e.key=='ArrowLeft') {
            backwardTen();
        } else if(e.key=='ArrowUp') {
            volumeUp();
        } else if(e.key=='ArrowDown') {
            volumeDown();
        }
    });

    video.addEventListener('click', () => {
        playPause();
    })
    // Make volume Range sync with actual video voluem
    video.addEventListener('volumechange', () => {
        const vol = video.volume * 10
        volumeRange.value = vol;
       
        if(vol === 0) {
            muteUnmuteBtn.childNodes[0].setAttribute('class', 'fas fa-volume-mute')
        } else if(vol > 0 && vol < 5) {        
            muteUnmuteBtn.childNodes[0].setAttribute('class', 'fas fa-volume-down')
        } else {
            muteUnmuteBtn.childNodes[0].setAttribute('class', 'fas fa-volume-up')
        }    
    });

    // Handle subtitles and last current time save
    video.addEventListener('timeupdate', (e) => {
        localStorage[`video${data.meta.id}`] = video.currentTime;
    
        // handle subtitles
        let sub = subtitlesArr.filter( item =>
                video.currentTime >= item.start/1000 &&
                video.currentTime <= item.end/1000          // python script convert to ms
        );

        if (sub.length > 0) {
            subtitles.innerHTML = sub[0].content;
        }
        // sync seekbar with current time
        seekbar.style.width = (video.currentTime / video.duration) * seekbarContWidth;
    })

    seekbarCont.addEventListener("click",function(e){
        const whereToPercent = e.offsetX / seekbarContWidth;
        video.currentTime = video.duration * whereToPercent;
    });


});

// Append video sources 
function appendVideoSources(videoEl, sources) {
    sources.forEach((src) => {
        const source = document.createElement('source');
        source.setAttribute('src', src[0]);
        source.setAttribute('type', src[1]);
        videoEl.appendChild(source);
    });
} 

// load meta data in the UI like title / credits
function loadMeta(meta) {
    title.innerHTML = meta.title;
    allowedAge.innerHTML = meta.allowedAge;
    cats.innerHTML = meta.cats.join(', ');
}

// Play/Pause
function playPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.childNodes[0].setAttribute('class', 'fas fa-pause');
    }
    else {
        video.pause();
        playPauseBtn.childNodes[0].setAttribute('class', 'fas fa-play');
    }
}

// Forward 10 seconds
function forwardTen() {
    video.currentTime += 10;
} 

// Backward 10 seconds
function backwardTen() {
    video.currentTime -= 10;
} 

// Volume up 1/10 at a a time
function volumeUp() {
    if (v < 10) v++;
    setVolume(v);
}

// Volume down 1/10 at a time
function volumeDown() {   
    if (v > 0) v--;
    setVolume(v); 
}

// Set volume equal to value
function volumeEqual(e) {
    v = e.target.value;
    setVolume(v);
}

// Mute / Unmute
function muteUnmute() {
    if (video.volume !== 0) {
        setVolume(0);
    }
    else {
        setVolume(v);
    } 
}

// set volume
function setVolume(v) {
    video.volume = v/10;
    console.log('Volume', video.volume);
}

// full screen
function fullScreen() {
    video.webkitEnterFullScreen();
}

// Control Speed 
function speedEqual(e) {
    video.playbackRate = Number(e.target.value);
}

