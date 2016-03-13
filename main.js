var backside = require("./backside");

// 自分の Sphero の ID に置き換える
var port = "COM3";
var orbDefaultColor = "orange";
var loopInterval = 1000;
var orb = {};

// 接続された時に呼び出されます。
function connect() {
  backside.color(orb, orbDefaultColor);
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  backside.move(50, "前", orb);
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
  backside.color(orb, "green", 1);
  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
