var ENDPOINT = "https://us-central1-container-solutions.cloudfunctions.net/registration";

var DATA = {"people": [
  {"name": "Adam Sandor",
	 "bio": "Adam was a hardcore Java developer and software architect was as long as he could remember until his recent dive into the world of programmable infrastructure."},
	{"name": "Carlos",
	 "bio": "Carlos Leon is a Colombian nerd working in tech for 6 years. He works as a software engineer at Container Solutions writing systems to automate the provisioning, orchestration and scaling of bare metal and virtual infrastructures."}
]};

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
    data: data,
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function() {
  })
  .fail(function() {
  });
});
