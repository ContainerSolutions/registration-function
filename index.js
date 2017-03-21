var https = require('https');

var authOptions = {
  host: 'm86akw3u3c.execute-api.eu-west-1.amazonaws.com',
  path: '/prod/sso',
  method: 'POST',
  headers: {
   accept: '*/*'
  }
}

var spamOptions = {
  hostname: 'm86akw3u3c.execute-api.eu-west-1.amazonaws.com',
  path: '/prod/testHack',
  method: 'POST',
  headers: {
   accept: '*/*'
  }
}

exports.registration = function registration(req, res, cb) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  function callback(json) {
    cb()
  }

  if (req.method == "GET") {
    // get all registrations
    var registrants = getRegistrants()
    res.status(200).send(JSON.stringify(registrants));
  } else if (req.method == "POST") {
    // register new person
    console.log(req.body);

    isAuth(req.body.name, req.body.password)
    .then(function() {
      return isSpam(req.body.bio);
    }, function() {
      res.status(400).send("FORBIDDEN");
    })
    .then(function() {
      res.status(200).send("SUCCESS");
    }, function() {
      res.status(400).send("SPAM");
    });

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

function isAuth(name, password) {
  return doPost(authOptions, {
    "username": name,
    "password": password
  }).then(function(chunk) {
    return new Promise(function(resolve, reject) {
      chunk.isAuth ? resolve() : reject();
    });
  });
}

function isSpam(text) {
   return new Promise(function(resolve, reject) {
     resolve();
  });
}


function doPost(options, payload) {
  return new Promise(function(resolve, reject) {
    var req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log(chunk);
        resolve(JSON.parse(chunk));
      });
    });

    req.on('error', function(e) {
      console.log(e);
      reject(e);
    });
    console.log(payload);
    req.write(JSON.stringify(payload));
    req.end();

  });
}
