// バックで環境設定などのややこしい処理をします。
var sphero = require("sphero");

var loopInterval = 1000;
var events = {};
module.exports = {
  addEventListener: function(eventName, fn) {
    if (typeof events[eventName] === "undefined") {
      events[eventName] = [];
    }
    events[eventName].push(fn);
  },
  connect: function(orb, port, callback) {
    orb = sphero(port);
    orb.connect(function() {
      orb.detectCollisions(); // 衝突判定を有効化
      setTimeout(loop, loopInterval);
      callback(orb);
    });
    orb.on("collision", function() {
      raiseEvent("collision");
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
