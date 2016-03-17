// バックで環境設定などのややこしい処理をします。
var sphero = require("sphero");
var events = {};
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
    var _deg;
    if (typeof deg === "number") {
      _deg = deg;
    } else if (typeof deg === "string") {
      var _deg = 0;
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
    orb.roll(speed, _deg);
    setMoveLoop(orb, speed, _deg);
  },
  color: function(orb, color, time) {
    var _c;
    orb.getColor(function(err, data) {
      // なぜかdata.colorは、16進数だが文字列として帰ってくるので、parseInt。
      _c = parseInt(data.color);
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

// (#15) orb.roll が、数秒後に止まらないようにする
function setMoveLoop(orb, speed, deg) {
  if (moveLoopId !== -1) {
    clearTimeout(moveLoopId);
  }
  var loop = function() {
    orb.roll(speed, deg);
    moveLoopId = setTimeout(loop, 1000);
  }
  moveLoopId = setTimeout(loop, 1000);
}
var moveLoopId = -1;
