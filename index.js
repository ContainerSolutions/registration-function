var http = require('http');

var authOptions = {
  hostname: 'https://m86akw3u3c.execute-api.eu-west-1.amazonaws.com',
  port: 80,
  path: '/prod/sso',
  method: 'POST'
}

var spamOptions = {
  hostname: 'https://m86akw3u3c.execute-api.eu-west-1.amazonaws.com',
  port: 80,
  path: '/prod/testHack',
  method: 'POST',
}

exports.registration = function registration(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method == "GET") {
    // get all registrations
    var registrants = getRegistrants()
    res.status(200).send(JSON.stringify(registrants));
  } else if (req.method == "POST") {
    // register new person
    // var reqParsed = JSON.parse(req);
    console.log(JSON.parse(req.body).stringify());

    if (!authenticateUser(reqParsed.name, reqParsed.password)) {
      res.status(400).send("FORBIDDEN");
    }
    if (isSpam(reqParsed.bio)) {
      res.status(400).send("SPAM");
    }
    register(reqParsed.name, reqParsed.bio)
      ? res.status(200).send("SUCCESS")
      : res.status(200).send("FAILED");
  } else if (req.method == "OPTIONS") {
    // CSS stuff
    res.status(200).end();
  } else {
    // unsupported method
    res.status(400).send("NOT_SUPPORTED");
  }
};

function getRegistrants() {
  return [
    {
      "name": "Adam Sandor",
      "bio": "Adam was a hardcore Java developer and software architect was as long as he could remember until his recent dive into the world of programmable infrastructure"
    },
    { "name": "Carlos",
      "bio": "Carlos Leon is a Colombian nerd working in tech for 6 years. He works as a software engineer at Container Solutions writing systems to automate the provisioning, orchestration and scaling of bare metal and virtual infrastructures"
    }
  ]
}

function register(name, bio) {
  return true;
}

function isSpam(text) {
  console.log(text);
  var input = {
    "payload": text,
    "account": "team_registration"
  };
//  output = {
//    "isSpam": false,
//    "probability": 1
//  };
  return doPost(spamOptions, JSON.stringify(input)).isSpam;
}

function authenticateUser(name, password) {
  return true;

//   var input = {
//     "username": name,
//     "password": password,
//     "account": "team_registration"
//   };
//   var res = doPost(authOptions, JSON.stringify(input));
// //  output = {
// //    "roles": ["all"],
// //    "auth": true
// //  }
//   return JSON.parse(res).auth;
}

function doPost(options, payload) {
  var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          return chunk
      });
  });
  req.write(payload);
  req.end();
}

function doGet(options) {
  var req = http.request(options, function(res) {
    var body = '';
    res.on('data', function(d) {
      body += d;
    });
    res.on('end', function() {
      return JSON.parse(body);
    });
  });
  req.end();
}
