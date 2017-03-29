$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/api/getClass",
    success: function (data) {
      var isFreshSoph = data['active'];
      if (isFreshSoph == "0") {
        $('.btn-freshmen').show();
        $('.btn-sophomores').show();
      } else {
        $('.btn-juniors').show();
        $('.btn-seniors').show();
      }
    }
  });
});
