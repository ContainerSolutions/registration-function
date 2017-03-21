var ENDPOINT = "https://us-central1-container-solutions.cloudfunctions.net/registration";
//var ENDPOINT = "http://172.17.0.2:8010/container-solutions/us-central1/registration";

$("#form").hide();

$(document).ready(function() {
  $.get(ENDPOINT)
    .done(function(data) {
      JSON.parse(data).forEach(function(people) {
        $("#list").append('<tr><td>' + people.name + '</td><td>' + people.bio + '</td></tr>');
      });
    });
});

$("#register").click(function() {
  $("#main").hide(400);
  $("#form").show(400);
});


$("#cancel").click(function() {
  $("#main").show(400);
  $("#form").hide(400);
});

$("#submit").click(function() {
  var data = {
    "name": $('#nameField').get(0).value,
    "password": $('#passwordField').get(0).value,
    "bio": $('#bioField').get(0).value
  };
  console.log(data);
  $.ajax({
    type: 'POST',
    url: ENDPOINT,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function() {
  })
  .fail(function() {
  });
});
