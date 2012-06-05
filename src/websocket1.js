var webSocket = (window.WebSocket) ?
  new WebSocket("ws://localhost:8080/demo/socket") :
  new MozWebSocket("ws://localhost:8080/demo/socket");

webSocket.onopen = function () {
  webSocket.send("list");
};

webSocket.onmessage = function (e) {
  var p = JSON.parse(e.data);
  for (var i = 0; i < p.length; i += 1) {
    var row = "<tr><td>" + p[i].name +
              "</td><td>" + p[i].time+ "</td></tr>";
