// @codekit-prepend "../../js/libs/jquery.js"

var $ = $ || {};
var Html5 = Html5 || {};

Html5.TodayDemo = (function ($) {
    "use strict";
    var Demo = {};

    Demo.startHistory = function () {

        history.replaceState({href : window.location.href});

        $("a").click(function (e) {
            e.preventDefault();

            var href = e.srcElement.href;
            $(".content").load(href + " .content > *", function (response, status, xhr) {
                if (history.pushState) {
                    history.pushState({ href : href}, null, href);
                }
            });
        });

        $(window).on("popstate", function () {
            if (event.state) {
                $('.content').load(event.state.href + " .content > *");
            }
        });
    };


    return Demo;

}($));

$(function () {
    Html5.TodayDemo.startHistory();
});
