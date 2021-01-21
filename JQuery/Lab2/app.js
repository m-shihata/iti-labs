$(document).ready(function() {
    // Load home page by default 
    $('view').load('views/home.html');

    // load each view on click at it's nav list item
    $('li').click(function(e) {
        $('view').load(`views/${e.target.dataset.view}.html`)
    });

    // $('.droplist').hover(function(e){
    //     $(e.target).children().stop().show(500);
    //     },function(e){
    //     $(e.target).children().stop().hide(500);
    // });
    
});



