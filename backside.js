// バックで環境設定などのややこしい処理をします。
var sphero = require("sphero");
var events = {};
var moveLoopId = -1;

module.exports = {
  addEventListener: function(eventName, fn) {
    if (typeof events[eventName] === "undefined") {
      events[eventName] = [];
    }
    events[eventName].push(fn);
  },
  connect: function(port, callback) {
    var orb = sphero(port);
    orb.connect(function() {
      console.log("準備開始");
      orb.startCalibration(); // 位置関係の補正
      setTimeout(function() {
        console.log("準備終了");
        orb.finishCalibration();
        orb.detectCollisions(); // 衝突判定を有効化
        callback(orb);
      }, 10000);
    });
    orb.on("collision", function() {
      raiseEvent("collision");
    });
    return orb;
  },
  move: function(speed, deg, orb) {
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
  color: function(orb, color, time) {
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
  if (typeof events[eventName] !== "undefined") {
    events[eventName].forEach(i => {
      i();
    });
  }
}

// 継続的に実行するためにラップする
function roll(orb, speed, degree) {
  clearTimeout(moveLoopId);
  orb.roll(speed, degree);
  moveLoopId = setTimeout(roll, 1000, orb, speed, degree);
}