// samples/sample-array.js に移行したので消したい

var backside = require("./backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "COM7";
var angles = [
  "前", "右", "前", "左", "前"
];
var currentAnglePoint = 0;

var graph = [];

// 接続された時に呼び出されます。
function connect() {
  backside.color("orange");
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  backside.move(255, angles[Math.min(currentAnglePoint++, angles.length - 1)]);
  // ここまで
}

// 衝突時に呼び出されます。
function collision(index) {
  // ここに処理を書きます
  console.log(index);
  backside.color("red");
  setTimeout(function() {
    backside.color("green");
  }, 500);
  backside.move(255, angles[Math.min(currentAnglePoint++, angles.length - 1)]);
  // ここまで
}

backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
