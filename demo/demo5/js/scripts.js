// @codekit-prepend "../../js/libs/jquery.js"

var $ = $ || {};
var Html5 = Html5 || {};

Html5.TodayDemo = (function ($) {
    "use strict";
    var Demo = {};

    Demo.startHistory = function () {

        $("a").click(function (e) {
            e.preventDefault();

            var href = e.srcElement.href;
            $(".content").load(href + " .content > *");
        });
    };


    return Demo;

}($));

$(function () {
    Html5.TodayDemo.startHistory();
});
