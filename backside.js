// バックで環境設定などのややこしい処理をします。
var sphero = require("sphero");
var keypress = require("keypress");

var events = {};
var moveLoopId = -1;
var collisionCount = 0;
var orb;
var keypressCallbacks = {};

module.exports = {
  addEventListener: function(eventName, fn) {
    if (typeof events[eventName] === "undefined") {
      events[eventName] = [];
    }
    events[eventName].push(fn);
  },
  connect: function(port, callback) {
    orb = sphero(port);
    orb.connect(function() {
      console.log("準備開始");
      orb.startCalibration(); // 位置関係の補正
      setKeypressCallback("space", function() {
        console.log("準備終了");
        orb.finishCalibration();
        orb.detectCollisions(); // 衝突判定を有効化
        callback(orb);
      });
    });
    orb.on("collision", function() {
      raiseEvent("collision", collisionCount++);
    });
    return orb;
  },
  move: function(speed, deg) {
    var _deg = 0;
    if (typeof deg === "number") {
      _deg = deg;
    } else if (typeof deg === "string") {
      switch (deg) {
        case "左":
          _deg = 270;
          break;
        case "後":
          _deg = 180;
          break;
        case "右":
          _deg = 90;
          break;
        case "前":
          _deg = 0;
          break;
      }
    }
    roll(orb, speed, _deg);
  },
  color: function(color, time) {
    orb.getColor(function(err, data) {
      // なぜかdata.colorは、16進数だが文字列として帰ってくるので、parseInt。
      var _c = parseInt(data.color);
      orb.color(color);
      if (typeof time !== "undefined") {
        setTimeout(function() {
          orb.color(_c);
        }, time * 1000);
      }
    });
  }
};

function raiseEvent(eventName) {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    if (i === 0) continue;
    args.push(arguments[i]);
  }
  if (typeof events[eventName] !== "undefined") {
    events[eventName].forEach(i => {
      i.apply(this, args);
    });
  }
}

// 継続的に実行するためにラップする
function roll(orb, speed, degree) {
  clearTimeout(moveLoopId);
  orb.roll(speed, degree);
  moveLoopId = setTimeout(roll, 1000, orb, speed, degree);
}

function configureKeypress() {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function(ch, key) {
    if (key && key.ctrl && key.name === 'c') {
      console.log("exit");
      process.stdin.pause();
      process.exit();
    }
    if (typeof keypressCallbacks[key.name] !== "undefined") {
      keypressCallbacks[key.name].forEach(i => {
        i();
      });
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function setKeypressCallback(key, callback) {
  if (typeof keypressCallbacks[key] === "undefined") {
    keypressCallbacks[key] = [];
  }
  keypressCallbacks[key].push(callback);
}
configureKeypress();