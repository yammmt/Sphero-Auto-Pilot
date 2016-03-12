var sphero = require("sphero");
var orb = sphero("COM3");

orb.connect(function() {
  orb.startCalibration();
  setTimeout(function() {
    orb.finishCalibration();
    orb.streamAccelerometer(10);
    setInterval(function() {
      orb.roll(255, 0);
    }, 500);
    orb.on("accelerometer", function(data) {
      console.log(data.xAccel.value[0] + ", " + data.zAccel.value[0]);
      // if (data.xAccel.value[0] < -600 || data.zAccel.value[0] < -600) {
      //   console.log("動いている");
      // } else {
      //   console.log("止まっている");
      // }
    });
  }, 5000);
});
