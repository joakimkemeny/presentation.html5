$(window).on("popstate", function () {
    if (event.state) {
        $('.content').load(event.state.href + " .content > *");
    }
});

history.replaceState({href : window.location.href});
