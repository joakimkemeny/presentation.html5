// @codekit-prepend "../../js/libs/jquery.js"

var $ = $ || {};
var Html5 = Html5 || {};

Html5.TodayDemo = (function ($) {
    //"use strict";
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

    Demo.startRegistration = function () {

        var webSocket = (window.WebSocket) ?
            new WebSocket("ws://localhost:8080/html5-today-websockets/socket") :
            new MozWebSocket("ws://localhost:8080/html5-today-websockets/socket");

        webSocket.onopen = function () {
            webSocket.send("list");
        };

        webSocket.onmessage = function (e) {
            var participants = JSON.parse(e.data);
            var i;

            if ($(".registered").is(":visible")) {
                for (i = 0; i < participants.length; i += 1) {
                    $("#participants tbody").prepend("<tr style=\"display:none\"><td>" + participants[i].name + "</td><td>" + participants[i].time+ "</td></tr>");
                    $("#participants tbody tr:first-child").fadeIn("slow");
                }
            } else {
                for (i = 0; i < participants.length; i += 1) {
                    $("#participants tbody").prepend("<tr><td>" + participants[i].name + "</td><td>" + participants[i].time+ "</td></tr>");
                }
                if (participants.length > 0) {
                    $(".registered").fadeIn();
                }
            }
        };

        $("#register").click(function (e) {
            webSocket.send($("#participant").val());
            $("#participant").val("");
            return false;
        });
    };


    return Demo;

}($));

$(function () {
    Html5.TodayDemo.startRegistration();
    Html5.TodayDemo.startHistory();
});
