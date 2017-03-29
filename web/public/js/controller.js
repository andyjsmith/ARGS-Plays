function getCookie(name) {
var value = "; " + document.cookie;
var parts = value.split("; " + name + "=");
if (parts.length == 2) return parts.pop().split(";").shift();
}

var skipTimeout = false;

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 200070 00:00:00 GMT";
    }
}

$(document).ready(function() {

  if (!getCookie("id") || getCookie("id") != window.location.pathname.substring(1)) {
    $.ajax({
      type: "POST",
      url: "/api/newUser",
      data: {
        className: window.location.pathname.substring(1)
      }
    });
  }

  $(".btn-fullscreen").click(function() {
    $(document).fullScreen(true);
  });

  $(".btn-up").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "up"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-down").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "down"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-left").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "left"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-right").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "right"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-a").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "a"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-b").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "b"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-x").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "x"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

  $(".btn-y").click(function() {
    if (!isPlayerTimeout() || skipTimeout) {
      $.ajax({
        type: "POST",
        url: "/api/command",
        data: {
          "className": getCookie("className"),
          "id": getCookie("id"),
          "command": "y"
        }
      });
      setPlayerTimeout(new Date().getTime() + 2000);
    }
  });

});

var playerTimeout = 0;

var interval = setInterval(function() {
  if (playerTimeout > new Date().getTime()) {
    $(".timeout").show().html("Please wait " + Math.floor((playerTimeout - new Date().getTime()) / 1000 + 1) + "s");
  } else {
    $(".timeout").hide();
    clearInterval(playerTimeout);
  }
}, 100)

function setPlayerTimeout(timeout) {
  playerTimeout = timeout;
}

function isPlayerTimeout() {
  return playerTimeout > new Date().getTime();
}
