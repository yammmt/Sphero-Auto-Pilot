var backside = require("./backside");

// 自分の Sphero の ID に置き換える
var port = "COM3";
var orb = {};

// 接続された時に呼び出されます。
function connect() {
  backside.color(orb, "orange");
  // ここに処理を書きます
  backside.move(50, "前", orb);
  // ここまで
}

// 衝突時に呼び出されます。
function collision() {
  // ここに処理を書きます
  backside.color(orb, "green", 1);
  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
