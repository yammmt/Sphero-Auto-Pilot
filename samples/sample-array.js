var backside = require("./../backside");
var keypress = require("keypress");

// 自分の Sphero の ID に置き換える
var port = "COM7";

var currentAnglePoint = 0;
var angles = [
  "前", "右", "前", "左", "前"
];

// 接続された時に呼び出されます。
function connect() {
  backside.color("orange");
  // ここに処理を書きます
  backside.move(199, angles[Math.min(currentAnglePoint++, angles.length - 1)]);
  // ここまで
}

// 衝突時に呼び出されます。
function collision(count) {
  // ここに処理を書きます
    
  // 配列で書くこともできるよ
  backside.move(100, angles[Math.min(currentAnglePoint++, angles.length - 1)]);
  // ここまで
}

backside.connect(port, connect);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
