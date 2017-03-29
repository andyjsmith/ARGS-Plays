var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cmd = require('node-cmd');
var MongoClient = require('mongodb').MongoClient;
var auth = require('basic-auth');
var fs = require('fs');
var obsWSJS = require('obs-websocket-js');
var obsWS = new obsWSJS.OBSWebSocket();

obsWS.connect('localhost', 'argstech');

obsWS.onAuthenticationSuccess = function() {
  console.log('Connection Opened');

  obsWS.setCurrentScene("Instructions");
};

// Player 2 controls
const PLAYER_1_A = "z";
const PLAYER_1_B = "x";
const PLAYER_1_X = "c";
const PLAYER_1_Y = "v";
const PLAYER_1_UP = "w";
const PLAYER_1_DOWN = "s";
const PLAYER_1_LEFT = "a";
const PLAYER_1_RIGHT = "d";
const PLAYER_1_LB = "q";
const PLAYER_1_RB = "e";

// Player 2 controls
const PLAYER_2_A = "7";
const PLAYER_2_B = "8";
const PLAYER_2_X = "9";
const PLAYER_2_Y = "0";
const PLAYER_2_UP = "i";
const PLAYER_2_DOWN = "k";
const PLAYER_2_LEFT = "j";
const PLAYER_2_RIGHT = "l";
const PLAYER_2_LB = "u";
const PLAYER_2_RB = "o";

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('./index.html', { root: __dirname });
});

app.get('/freshmen', function (req, res) {
  res.sendFile('./controller.html', { root: __dirname });
});

app.get('/sophomores', function (req, res) {
  res.sendFile('./controller.html', { root: __dirname });
});

app.get('/juniors', function (req, res) {
  res.sendFile('./controller.html', { root: __dirname });
});

app.get('/seniors', function (req, res) {
  res.sendFile('./controller.html', { root: __dirname });
});

// Admin page
app.get('/admin', function (req, res) {
  var credentials = auth(req)
  if (!credentials || credentials.name !== 'argsplays' || credentials.pass !== 'args101157') {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied');
  } else {
    res.sendFile('./admin.html', { root: __dirname });
  }
});


// API
var router = express.Router();
app.use('/api', router);

router.route('/admin/setClass').post(function(req, res) {
  MongoClient.connect('mongodb://localhost:27017/ARGSPlays', function(err, db) {
    if (err) {
      throw err;
      console.log("Error 0!");
    }
    db.collection('settings').update({"key": "activePlayer"}, {$set: {value: req.body.class}});
  });
});

router.route('/getClass').get(function(req, res) {
  MongoClient.connect('mongodb://localhost:27017/ARGSPlays', function(err, db) {
    if (err) {
      throw err;
      console.log("Error 1!");
    }
    db.collection('settings', function(error, collection) {
      collection.findOne({"key": "activePlayer"}, function(err, docs) {
        if (err) {
          throw err;
          console.log("Error 2!");
        }
        res.send({"active": docs['value']});
      });
    });
  });
});

router.route('/admin/command').post(function(req, res) {
  if (req.body.command == "enter") {
    pressKey("enter");
  }
  res.send({"command": req.body.c});
});

router.route('/admin/getScenes').post(function(req, res) {
  obsWS.getSceneList(function(err, data) {
    res.send({"scenes": data.scenes});
  });
});

router.route('/admin/setScene').post(function(req, res) {
  obsWS.setCurrentScene(req.body.scene);
  res.send("success");
});

router.route('/command').post(function(req, res) {
  fs.readFile('chat.txt', function read(err, data) {
      var length = data.toString().split(/\r\n|\r|\n/).length;
      var dataString = data.toString();
      var dataArray = dataString.split("\n");
      dataArray.splice(0, dataArray.length - 12);
      dataArray.push(capitalizeFirstLetter(req.body.className) + ": " + req.body.command.toUpperCase());
      fs.writeFile("chat.txt", dataArray.join("\n"), function(err) {});
  });

  if (req.body.className == "freshmen" || req.body.className == "juniors") {
    switch (req.body.command) {
      case "up":
        pressKey(PLAYER_1_UP);
        break;
      case "down":
        pressKey(PLAYER_1_DOWN);
        break;
      case "left":
        pressKey(PLAYER_1_LEFT);
        break;
      case "right":
        pressKey(PLAYER_1_RIGHT);
        break;
      case "a":
        pressKey(PLAYER_1_A);
        break;
      case "b":
        pressKey(PLAYER_1_B);
        break;
      case "x":
        pressKey(PLAYER_1_X);
        break;
      case "y":
        pressKey(PLAYER_1_Y);
        break;
      case "l":
        pressKey(PLAYER_1_LB);
        break;
      case "r":
        pressKey(PLAYER_1_RB);
        break;
      default:
        break;
    }
  } else {
    switch (req.body.command) {
      case "up":
        pressKey(PLAYER_2_UP);
        break;
      case "down":
        pressKey(PLAYER_2_DOWN);
        break;
      case "left":
        pressKey(PLAYER_2_LEFT);
        break;
      case "right":
        pressKey(PLAYER_2_RIGHT);
        break;
      case "a":
        pressKey(PLAYER_2_A);
        break;
      case "b":
        pressKey(PLAYER_2_B);
        break;
      case "x":
        pressKey(PLAYER_2_X);
        break;
      case "y":
        pressKey(PLAYER_2_Y);
        break;
      case "l":
        pressKey(PLAYER_2_LB);
        break;
      case "r":
        pressKey(PLAYER_2_RB);
        break;
      default:
        break;
    }
  }

  res.send({
    "timeout": new Date().getTime() + 1000 * 2,
    "current": new Date().getTime()
  });
});

router.route('/newUser').post(function(req, res) {
  newUser(req, res);
});

function newUser(req, res) {
  var newUUID = generateUUID();
  // MongoClient.connect('mongodb://localhost:27017/ARGSPlays', function(err, db) {
  //   if (err) {
  //     throw err;
  //     console.log("Error! 5");
  //   }
  //   db.collection('users').insert({
  //     _id: newUUID,
  //     className: req.body.className,
  //     timeout: 0
  //   });

    res.cookie('id', newUUID);
    res.cookie('className', req.body.className);

    res.send({
      "id": newUUID
    });
  // });
}

app.listen(8080, function () {
  console.log('ARGS Plays running on port 8080');
});

function pressKey(key) {
  //cmd.get("wmctrl -a ZSNES");
  cmd.get("python3 ~/Documents/argsplays/KeyPresser.py " + key);
}


// // /api/request
// {
//   timestamp: "",
//   className: "2017",
//   button: "",
//   userId: "",
// }
//
// // /api/newUser
// {
//   timestamp: "",
//   className: ""
// }
//
// response
//
// {
//   timestamp: "",
//   userId: generateUUID()
// }
