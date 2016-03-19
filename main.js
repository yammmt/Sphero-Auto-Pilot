var backside = require("./backside");

// 自分の Sphero の ID に置き換える
var port = "COM3";

// 接続された時に呼び出されます。
function connect() {
  backside.color("orange");
  // ここに処理を書きます
  backside.move(100, "前");
  // ここまで
}

// 衝突時に呼び出されます。
function collision(count) {
  // ここに処理を書きます
  // ここまで
}

backside.connect(port, connect);
backside.addEventListener("collision", collision);
