var backside = require("./backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "COM7";
var orbDefaultColor = "orange";
var loopInterval = 1000;
var orb = {};
var angles = [
  0, 90, 0, 270, 0
];
var currentAnglePoint = 0;

var graph = [];

// 接続された時に呼び出されます。
function connect() {
  orb.color(orbDefaultColor);
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  backside.move(100, angles[currentAnglePoint++], orb);

  orb.streamVelocity();

  orb.on("velocity", function(data) {
    graph.push(data.xVelocity.value);
    graph.push(data.yVelocity.value);
  });

  keypress(process.stdin);
  process.stdin.on("keypress", function(ch, key) {
    if (key.ctrl && key.name === "c") {
      console.log(graph.join(","));
      process.stdin.pause();
      process.exit();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
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
  backside.move(100, angles[currentAnglePoint++], orb);

  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
