var backside = require("./backside");

// 自分の Sphero の ID に置き換える
var port = "COM7";
var orbDefaultColor = "lightseagreen";
var loopInterval = 1000;
var orb = {};

// 接続された時に呼び出されます。
function connect() {
  orb.color(orbDefaultColor);
  setTimeout(loop, loopInterval);
  // ここに処理を書きます
  
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
  
  // ここまで
}

console.log(typeof orb);
orb = backside.connect( port, connect);
console.log(orb);
backside.addEventListener("collision", collision);
backside.addEventListener("loop", loop);
