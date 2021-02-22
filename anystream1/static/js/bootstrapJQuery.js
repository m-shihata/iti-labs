$("[data-toggle='popover']").each(function(index, element) {
    var el= $(element).data().target;
    var contentHtml = $(el).html();

    $(element).popover({
        trigger: "manual",
        html: true, 
        sanitize: false,
        content: contentHtml,
        template: `<div class="popover bg-transparent" role="tooltip"><div class="popover-body rounded-lg"></div></div>`
    })
    .on("mouseover", function() {
        var _this = this;
        $(this).popover("show");
        $('#seekbarContainer').css('visibility', 'hidden');
        $(".popover").on("mouseleave", function() {
            $(_this).popover('hide');
            $('#seekbarContainer').css('visibility', 'visible');
        });
    })
    .on("mouseleave", function() {
        var _this = this;
        setTimeout(function() {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
                $('#seekbarContainer').css('visibility', 'visible');
            }
        }, 200);
    });
});

$(function() {
	$('[type="range"], h4>span').css('filter', 'hue-rotate(-' + '230' + 'deg)');
});


