// @codekit-prepend "libs/jquery.js"
// @codekit-prepend "libs/impress.js"
// @codekit-prepend "libs/rainbow.js"
// @codekit-prepend "libs/language/c.js"
// @codekit-prepend "libs/language/csharp.js"
// @codekit-prepend "libs/language/css.js"
// @codekit-prepend "libs/language/generic.js"
// @codekit-prepend "libs/language/html.js"
// @codekit-prepend "libs/language/javascript.js"
// @codekit-prepend "libs/language/lua.js"
// @codekit-prepend "libs/language/php.js"
// @codekit-prepend "libs/language/python.js"
// @codekit-prepend "libs/language/ruby.js"
// @codekit-prepend "libs/language/scheme.js"
// @codekit-prepend "libs/language/shell.js"

var $ = $ || {};
var Html5 = Html5 || {};

Html5.Today = (function ($) {
    "use strict";
    var Presentation = {};

    Presentation.loadDemo = function (step) {
        if (step.data("demo-loaded")) {
            return;
        }

        var browser = step.find(".browser");
        var addressBar = browser.find(".address div");
        browser.append("<iframe src='" + addressBar.text() + "' frameborder='0'></iframe>");

        var iframe = browser.find("iframe");
        iframe.load(function () {
            addressBar.text(this.src);
        });

        step.data("demo-loaded", true);
    };

    Presentation.loadSrc = function (step) {
        if (step.data("src-loaded")) {
            return;
        }

        $("code[data-src]", step).each(function (index, element) {
            var $element = $(element)
            var srcUrl = $element.data("src");
            var srcLang = $element.data("language");
            $.get(srcUrl, function (data) {
                if (srcLang === "text" || srcLang === "") {
                    $element.append(data);
                } else {
                    Rainbow.color(data, srcLang, function (highlighted) {
                        $element.append(highlighted);
                    });
                }
            }, "text");
        });

        step.data("src-loaded", true);
    };

    /*
    Presentation.startBrowsers = function () {
        $("iframe").load(function (e) {
            var addressBar = $(this).parent().find("input");
            var win = this.contentWindow;
            addressBar.val(win.location.href);
            $(win).bind("hashchange", function () {
                addressBar.val(win.location.href);
            });
            $(win).bind("hashchange", function () {
                addressBar.val(win.location.href);
            });
            $(".reload", this).click(function (e) {
                win.location.reload();
            });
        });
    };
    */

    Presentation.activateKeyboard = function () {
        $(document).keypress(function (e) {
            if (e.keyCode == 46 && document.location.hash == "#/how-2") {
                var semantics = $("#html5-semantics");
                var offline = $("#html5-offline");
                var deviceaccess = $("#html5-deviceaccess");
                var connectivity = $("#html5-connectivity");
                var multimedia = $("#html5-multimedia");
                var graphics = $("#html5-graphics");
                var performance = $("#html5-performance");
                var css3 = $("#html5-css3");

                if (semantics.hasClass("active")) {
                    semantics.removeClass("active");
                    offline.removeClass("active");
                    deviceaccess.removeClass("active");
                    connectivity.removeClass("active");
                    multimedia.addClass("active");
                    graphics.addClass("active");
                    performance.removeClass("active");
                    css3.addClass("active");
                } else if (multimedia.hasClass("active")) {
                    semantics.removeClass("active");
                    offline.addClass("active");
                    deviceaccess.addClass("active");
                    connectivity.addClass("active");
                    multimedia.removeClass("active");
                    graphics.removeClass("active");
                    performance.removeClass("active");
                    css3.removeClass("active");
                } else if (offline.hasClass("active")) {
                    semantics.removeClass("active");
                    offline.removeClass("active");
                    deviceaccess.removeClass("active");
                    connectivity.removeClass("active");
                    multimedia.removeClass("active");
                    graphics.removeClass("active");
                    performance.removeClass("active");
                    css3.removeClass("active");
                } else {
                    semantics.addClass("active");
                    offline.removeClass("active");
                    deviceaccess.removeClass("active");
                    connectivity.removeClass("active");
                    multimedia.removeClass("active");
                    graphics.removeClass("active");
                    performance.addClass("active");
                    css3.removeClass("active");
                }

                $("#how-2 img").each(function (index, element) {
                    var $element = $(element);
                    var src = $element.attr("src");
                    var startIndex = src.indexOf("-active");
                    if (!$element.hasClass("active")) {
                        if (startIndex != -1) {
                            src = src.substring(0, startIndex) + src.substr(startIndex + 7);
                            $element.attr("src", src);
                        }
                    } else {
                        if (startIndex == -1) {
                            src = src.substring(0, src.length - 4) + "-active.png";
                            $element.attr("src", src);
                        }
                    }
                });
            }
        });
    };

    return Presentation;

}($));

$(function () {
    $(".step").on("impress:stepenter", function () {
        Html5.Today.loadSrc($(this));
        Html5.Today.loadDemo($(this));
    });

    Html5.Today.activateKeyboard();
    //Html5.Today.loadSrc();
    //Html5.Today.startBrowsers();
});
