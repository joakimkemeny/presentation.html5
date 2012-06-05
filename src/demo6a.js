$("a").click(function (e) {
    e.preventDefault();

    var href = e.srcElement.href;
    $(".content").load(href + " .content > *", function () {
        if (history.pushState) {
            history.pushState({ href : href}, null, href);
        }
    });
});
