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
      orb.detectCollisions(); // 衝突判定を有効化
      console.log("準備開始");	
      orb.startCalibration(); // 位置関係の補正
      setTimeout(function() {
        console.log("準備終了");
        orb.finishCalibration();
        callback(orb);
      }, 10000);
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
