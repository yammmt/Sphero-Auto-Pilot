// バックで難しい処理をします。
var sphero = require("sphero");
var orb;

var events = {};
module.exports = {
  addEventListener: function(eventName, fn) {
    if (typeof events[eventName] === "undefined") {
      events[eventName] = [];
    }
    events[eventName].push(fn);
  },
  connect: function(port, callback) {
    orb = sphero(port);
    orb.connect(callback);
    orb.on("collision", function() {
      raiseEvent("collision", orb);
    });
  }
};

function raiseEvent(eventName, param) {
  if (typeof events[eventName] !== "undefined") {
    events[eventName].forEach(i => {
      i(param);
    });
  }
}