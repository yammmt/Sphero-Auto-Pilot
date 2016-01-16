var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-YRW-AMP-SPP"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "chocolate";
var myOrb_color_collision = "goldenrod";

var myOrb_speed = 60; // 初期速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var degree_variation = 20; // 角度変化幅
var collision_limit = 100; // この回数だけ衝突すると終了
var collision_num = 0;



orb.connect(function() {

    orb.color(myOrb_color_default);
    orb.detectCollisions();

    // 進行方向の変更
    function changeDegree() {
        // myOrb_degree = (myOrb_degree+degree_variation)%360; // 右回り
        myOrb_degree = myOrb_degree-degree_variation; // 左回り
        if(myOrb_degree < 0) {
          myOrb_degree = 360;
        }
    };

    // 衝突時に発生するイベント
    orb.on("collision", function() {
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
        }, 2000);
    });

    // メインのループ関数
    function main() {
        console.log("speed : ", myOrb_speed, ", collision : ", collision_num);
        orb.roll(myOrb_speed, myOrb_degree);
        changeDegree();
        setTimeout(main, 500);
    };

    main();

});
