const imgs =  [
    {
        id: 1, 
        src: "imgs/img1.jpg"
    },
    {
        id: 2, 
        src: "imgs/img2.jpg"
    },
    {
        id: 3, 
        src: "imgs/img3.jpg"
    }
]

var left = 0;
const imgWidth = 800;

$(document).ready(() => {

    // load images 
    $(function() {
        imgs.forEach((img) => {
            $('#allImgsWrapper').append(`
                <div id="img${img.id}" class="imgWrapper" >
                    <img  alt="Image ${img.id}" src="${img.src}" />
                </div>
            `);
        });
    });

    // Display next photo
    $('#next').click(() => {
        if (left > (-imgs.length +1)*imgWidth) {
            left -= imgWidth*1.005; // .oo5 to fix style issue
            $('#allImgsWrapper').animate({'left': left});
        }
    });

    // Display previous photo
    $('#prev').click(() => {
        if (left < 0) {
            left += imgWidth*1.005; // .oo5 to fix style issue
            $('#allImgsWrapper').animate({'left': left});
        }
    });
});

