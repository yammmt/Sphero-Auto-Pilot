var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-YRW-AMP-SPP"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";
var myOrb_color_back = "coral"

var myOrb_speed = 255; // 初期速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var speed_accelerate = 0; // 速度上昇幅
var speed_decelerate = 0; // 速度下降幅
var degree_variation = 30; // 角度変化幅
var collision_limit = 100; // この回数だけ衝突すると終了
var collision_num = 0;

var refreshTime = 5000; // 単位はミリ秒



orb.connect(function() {

    orb.color(myOrb_color_default);
    orb.detectCollisions();

    // 加速
    function accelerateSpeed() {
    	  myOrb_speed = Math.min(myOrb_speed+speed_accelerate, 255);
    }

    // 減速
    function decelerateSpeed() {
        myOrb_speed = Math.max(myOrb_speed-speed_decelerate, 10);
    }

    // 進行方向の変更
    function changeDegree() {
        myOrb_degree = (myOrb_degree+degree_variation)%360;
    };

    // 衝突時に発生するイベント
    orb.on("collision", function() {
        decelerateSpeed();
        changeDegree();
        orb.color(myOrb_color_collision);
        collision_num++;
        if(collision_num >= collision_limit) {
          orb.color("firebrick");
          orb.disconnect(function() {
              console.log("end");
          });
        }
        if(setTimeoutID != -1) {
            clearTimeout(setTimeoutID);
        };
        setTimeoutID = setTimeout(refresh, refreshTime);
        setTimeout(function() {
            orb.color(myOrb_color_default);
        }, 2000);
    });

    function refresh() {
        console.log("back...");
        orb.color(myOrb_color_back);
        orb.roll(myOrb_speed, (myOrb_degree + 180) % 360);
        setTimeout(function() {
            orb.color(myOrb_color_default);
        }, 1000);
    }

    // メインのループ関数
    function main() {
        console.log("speed : ", myOrb_speed, ", collision : ", collision_num);
        orb.roll(myOrb_speed, myOrb_degree);
        accelerateSpeed();
        setTimeout(main, 2000);
    };

    main();
    setTimeoutID = setTimeout(refresh, refreshTime);

});
