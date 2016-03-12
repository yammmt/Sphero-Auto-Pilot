var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";
var myOrb_color_back = "coral";

var myOrb_speed = 100; // 初期速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var speed_accelerate = 0; // 速度上昇幅
var speed_decelerate = 0; // 速度下降幅
var degree_variation = 90; // 角度変化幅
var collision_limit = 100; // この回数だけ衝突すると終了
var collision_num = 0;

var refreshTime = 5000; // 単位はミリ秒

var isCollided = false;

var refreshTimeoutID = -1;
var mainTimeoutID = -1;

orb.connect(function() {

  orb.color(myOrb_color_default);
  orb.detectCollisions();

  // 加速
  function accelerateSpeed() {
    myOrb_speed = Math.min(myOrb_speed + speed_accelerate, 100);
  }

  // 減速
  function decelerateSpeed() {
    myOrb_speed = Math.max(myOrb_speed - speed_decelerate, 10);
  }

  // 進行方向の変更
  function changeDegree() {
    myOrb_degree = (myOrb_degree + degree_variation) % 360;
  }

  // 衝突時に発生するイベント
  orb.on("collision", function() {
    if (!isCollided) {
      isCollided = true;
      decelerateSpeed();
      orb.color("green");
      if (refreshTimeoutID != -1) {
        clearTimeout(refreshTimeoutID);
      }
      if (mainTimeoutID != -1) {
        clearTimeout(mainTimeoutID);
      }
      setTimeout(function() {
        orb.color("blue");
        // 少し後ろに下がってから (パワーは一定)
        move(30, (myOrb_degree + 180) % 360, 500, function() {
          orb.color("green");
          console.log("oh!");
          orb.roll(0, (myOrb_degree + 180) % 360);
          // orb.color(myOrb_color_default);
          changeDegree();
          setTimeout(function() {
            console.log("ah!");
            orb.color("blue");
            refreshTimeoutID = setTimeout(refresh, refreshTime);
            isCollided = false;
            main();
          }, 1000);
        });
        collision_num++;
        if (collision_num >= collision_limit) {
          orb.color("firebrick");
          orb.disconnect(function() {
            console.log("end");
          });
        }
      }, 500);
    }
  });

  function refresh() {
    console.log("back...");
    orb.color(myOrb_color_back);
    orb.roll(myOrb_speed, (myOrb_degree + 180) % 360);
    if (mainTimeoutID !== -1) {
      clearTimeout(mainTimeoutID);
    }
    setTimeout(function() {
      orb.color(myOrb_color_default);
    }, 1000);
    setTimeout(function() {
      main();
    }, 2000);
  }

  // メインのループ関数
  function main() {
    console.log("speed : ", myOrb_speed, ", collision : ", collision_num);
    orb.roll(myOrb_speed, myOrb_degree);
    accelerateSpeed();
    mainTimeoutID = setTimeout(main, 2000);
  }

  function move(power, deg, duration, resolve) {
    orb.roll(0, deg);
    setTimeout(function() {
      orb.roll(100, deg);
      setTimeout(function() {
        orb.roll(power, deg);
        setTimeout(function() {
          orb.roll(0, (deg + 180) % 360);
          setTimeout(function() {
            orb.roll(0, deg);
            resolve();
          }, 500);
        }, duration);
      }, 100);
    }, 500);
  }

  main();
  refreshTimeoutID = setTimeout(refresh, refreshTime);

});
