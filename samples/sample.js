var backside = require("./../backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "COM7";
var orb = {};

// 接続された時に呼び出されます。
function connect() {
  backside.color("orange");
  // ここに処理を書きます
  backside.move(255, "前", orb);
  // ここまで
}

// 衝突時に呼び出されます。
function collision(count) {
  // ここに処理を書きます
  // ぶつかったかの確認
  backside.color(orb, "green", 0.5);
  if (count === 0) {
    // 1 回目のとき
    backside.move(255, "右", orb);
  }
  if (count === 1) {
    // 2 回目のとき
    backside.move(255, "前", orb);
  }
  if (count === 2) {
    // 3 回目のとき
    backside.move(255, "左", orb);
  }
  if (count === 3) {
    // 4 回目のとき
    backside.move(255, "前", orb);
  }
  // ここまで
}

orb = backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
