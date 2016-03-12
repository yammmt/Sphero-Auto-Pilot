var backside = require("./backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "/dev/tty.Sphero-YRW-AMP-SPP";
var orbDefaultColor = "orange";
var loopInterval = 1000;
var orb = {};
var angles = [
  "前", "右", "前", "左", "前"
];
var currentAnglePoint = 0;

var graph = [];

// 接続された時に呼び出されます。
function connect() {
  orb.color(orbDefaultColor);
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  backside.move(255,angles[Math.max(currentAnglePoint++, angles.length)], orb);

  orb.streamAccelerometer();

  orb.on("accelerometer", function(data) {
    if (Math.abs(data.xAccel.value[0]) < 1000) {
      console.log("止まっている");
    } else {
      console.log("動いている");
    }
  });
  // ここまで
}

// メインとなるループ処理（上のloopIntervalの間隔で呼び出されます）
function loop() {
  // ここに処理を書きます

  // ここまで
  setTimeout(loop, loopInterval);
}

// 衝突時に呼び出されます。
function collision() {
  // ここに処理を書きます
  orb.color("red");
  setTimeout(function() {
    orb.color("green");
  }, 500);
  backside.move(255,angles[Math.max(currentAnglePoint++, angles.length)], orb);
  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
