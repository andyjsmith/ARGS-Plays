var scenes;

$(document).ready(function() {
  $(".btn-fresh-soph").click(function() {
    $.ajax({
      type: "POST",
      url: "/api/admin/setClass",
      data: {
        "class": 0
      }
    });
  });

  $(".btn-jun-sen").click(function() {
    $.ajax({
      type: "POST",
      url: "/api/admin/setClass",
      data: {
        "class": 1
      }
    });
  });

  $(".btn-enter").click(function() {
    $.ajax({
      type: "POST",
      url: "/api/admin/command",
      data: {
        "command": "enter"
      }
    });
  });

  $(".btn-set-scene").click(function() {
    $.ajax({
      type: "POST",
      url: "/api/admin/setScene",
      data: {
        "scene": $(".scene-switcher").val()
      }
    });
  });

  $.ajax({
    type: "POST",
    url: "/api/admin/getScenes"
  }).done(function(data) {
    scenes = data.scenes;
    populateSceneSwitcher(scenes);
  });
});

function populateSceneSwitcher(scenes) {
  $(".scene-switcher").empty();
  $.each(scenes, function(i, p) {
    $(".scene-switcher").append($('<option></option>').val(p.name).html(p.name));
  });
}
