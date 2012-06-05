    $("#participants tbody").prepend(row);
  }
};

$("#register").click(function (e) {
  webSocket.send($("#participant").val());
  $("#participant").val("");
  return false;
});
