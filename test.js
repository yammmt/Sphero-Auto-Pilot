var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

orb.connect(function() {
  function a() {
    orb.color("blue");
    orb.roll(100, 0);
    setTimeout(b, 1000);
  }
  function b() {
    orb.color("red");
    orb.roll(0, 0);
    setTimeout(c, 1000);
  }
  function c() {
    orb.color("green");
    orb.roll(100, 180);
    setTimeout(d, 1000);
  }
  function d() {
    orb.color("yellow");
    orb.roll(0, 180);
    setTimeout(a, 1000);
  }
  a();
});
