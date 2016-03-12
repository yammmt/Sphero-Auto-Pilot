var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

orb.connect(function() {
  function setSpheroTimeout(fn, time) {
    setTimeout(function() {
      orb.ping(function() {
        fn();
      });
    }, time);
  }
  function a() {
    orb.color("blue");
    orb.roll(100, 0);
    setTimeout(b, 100);
  }
  function b() {
    orb.color("red");
    orb.roll(0, 0);
    setSpheroTimeout(c, 100);
  }
  function c() {
    orb.color("green");
    orb.roll(100, 180);
    setTimeout(d, 100);
  }
  function d() {
    orb.color("yellow");
    orb.roll(0, 180);
    setSpheroTimeout(a, 100);
  }
  orb.color("black");
  setTimeout(function() {
    isCheckSphero = true;
    streamCallback = a;
  }, 100);
});
