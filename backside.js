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
  connect: function(port, callback) {
    var orb = sphero(port);
    console.log(typeof orb);
    orb.connect(function() {
      orb.detectCollisions(); // 衝突判定を有効化
      callback(orb);
    });
    orb.on("collision", function() {
      raiseEvent("collision");
    });
    return orb;
  }
};

function raiseEvent(eventName) {
  if (typeof events[eventName] !== "undefined") {
    events[eventName].forEach(i => {
      i();
    });
  }
}
