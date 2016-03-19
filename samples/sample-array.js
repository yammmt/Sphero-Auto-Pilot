var backside = require("./backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "COM7";
var orbDefaultColor = "orange";
var loopInterval = 1000;
var orb = {};
var currentAnglePoint = 0;
var angles = [
  "前", "右", "前", "左", "前"
];

// 接続された時に呼び出されます。
function connect() {
  orb.color(orbDefaultColor);
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  backside.move(255, angles[Math.min(currentAnglePoint++, angles.length - 1)], orb);
  // ここまで
}

// メインとなるループ処理（上のloopIntervalの間隔で呼び出されます）
function loop() {
  // ここに処理を書きます

  // ここまで
  setTimeout(loop, loopInterval);
}

// 衝突時に呼び出されます。
function collision(index) {
  // ここに処理を書きます
  // ぶつかったかの確認
  backside.color(orb, "green", 0.5);
  
  // 配列で書くこともできるよ
  backside.move(255, angles[Math.min(currentAnglePoint++, angles.length - 1)], orb);
  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
