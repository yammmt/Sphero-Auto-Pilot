var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";
var myOrb_color_back = "coral";
var myOrb_color_endRotate = "green";

var isCollided = false;
var isCollideChecked = false;
var isRefreshing = false;

var deg = 0;
var collidedYawAngle = 0;

var mainTimeoutId;
var refreshTimeoutId;

orb.connect(function() {

  // 最初の色に設定
  orb.color(myOrb_color_default);

  // 衝突判定を有効化
  orb.detectCollisions();

  // ImuAngleの取得を有効か。引数は、1秒に何回関数を呼ぶか。
  orb.streamImuAngles(8);

  // 角度を0に戻しておく。
  orb.roll(0, 0);

  orb.on("imuAngles", onImuAngleChanged);
  function onImuAngleChanged(data) {
    if (isCollided) {
      if (isCollideChecked) {
        deg = (deg + 15) % 360;
        orb.roll(0, deg);
        var diffAngle = getDiffAngle(collidedYawAngle, data.yawAngle.value[0]);
        console.log(diffAngle);
        if (diffAngle >= 90 && diffAngle <= 180) {
          console.log("stop!");
          orb.color(myOrb_color_endRotate);
          setTimeout(function() {
            orb.color(myOrb_color_default);
          }, 1000);
          isCollideChecked = false;
          isCollided = false;
          setTimeout(main, 1000);
        }
      } else {
        collidedYawAngle = data.yawAngle.value[0];
        isCollideChecked = true;
      }
    }
  }

  /**
   * 最初と今の角度の差を取得します。
   */
  function getDiffAngle(firstAngle, nowAngle) {
    return (firstAngle - nowAngle + 360) % 360;
  }

  // 衝突時に発生するイベント
  orb.on("collision", onCollision);
  function onCollision() {
    console.log("collision");
    if (!isCollided && !isRefreshing) {
      isCollided = true;
      isCollideChecked = false;
      orb.color(myOrb_color_collision);
      setTimeout(function() {
        orb.color(myOrb_color_default);
      }, 500);
      orb.roll(0, deg);
      clearTimeout(mainTimeoutId);
      clearTimeout(refreshTimeoutId);
    }
  }

  // メインのループ関数
  function main() {
    console.log("hoge");
    orb.roll(100, deg);
    mainTimeoutId = setTimeout(main, 1000);
    refreshTimeoutId = setTimeout(refresh, 5000);
  }
  main();

  function refresh() {
    console.log("refresh");
    isRefreshing = true;
    orb.roll(100, (deg + 180) % 360);
    clearTimeout(mainTimeoutId);
    setTimeout(function() {
      orb.roll(0, deg);
      isRefreshing = false;
      main();
    }, 1000);
  }
});
