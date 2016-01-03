var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-YRW-AMP-SPP"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";

var myOrb_speed = 50; // 初期速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var collision_limit = 10; // この回数だけ衝突すると終了
var collision_num = 0;



orb.connect(function() {

    orb.color(myOrb_color_default);
    orb.detectCollisions();

    // 加速
    function accelerateSpeed() {
      myOrb_speed = myOrb_speed+2;
    }

    // 減速
    function decelerateSpeed() {
      myOrb_speed = Math.max(myOrb_speed-10, 10);
    }

    // 進行方向の変更
    function changeDegree() {
        myOrb_degree = (myOrb_degree+90)%360;
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
        setTimeout(function() {
            orb.color(myOrb_color_default);
        }, 3000);
    });

    // メインのループ関数
    function main() {
        console.log("main");
        orb.roll(myOrb_speed, myOrb_degree);
        accelerateSpeed();
        setTimeout(main, 3000);
    };

    main();

});
