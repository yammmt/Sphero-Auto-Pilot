var sphero = require("sphero");
var orb = sphero("COM4"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";
var myOrb_color_back = "coral"

var myOrb_speed = 100; // 初期速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var speed_accelerate = 0; // 速度上昇幅
var speed_decelerate = 0; // 速度下降幅
var degree_variation = 30; // 角度変化幅


var isCollided = false;
var isCollideChecked = false;
var deg = 0;
var collidedYawAngle = 0;

var setTimeoutId = -1;

orb.connect(function() {

  orb.color(myOrb_color_default);

  orb.detectCollisions();
  orb.streamImuAngles();

  orb.on("imuAngles", onImuAngleChanged);

  function onImuAngleChanged(data) {
    if (isCollided) {
      if (isCollideChecked) {
        deg = (deg + 15) % 360;
        orb.roll(1, deg);
        console.log(getDiffAngle(collidedYawAngle, data.yawAngle.value[0]));
        console.log(": ", collidedYawAngle);
        console.log(": ", data.yawAngle.value[0]);
        if (getDiffAngle(collidedYawAngle, data.yawAngle.value[0]) === 90) {
          console.log("stop!");
          isCollideChecked = false;
          isCollided = false;
          setTimeout(onCollision, 1000);
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
    if (!isCollided) {
      isCollided = true;
      isCollideChecked = false;
      console.log("collision");
      orb.roll(0, 0);
      clearTimeout(setTimeoutId);
    }
  }

  // メインのループ関数
  function main() {
    if (!isCollided) {
      console.log("speed : ", 100);
      orb.roll(100, deg);
      setTimeoutId = setTimeout(main, 1000);
    }
  }
  main();
});
