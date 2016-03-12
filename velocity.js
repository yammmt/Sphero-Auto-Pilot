var sphero = require("sphero");
var orb = sphero("COM7");

orb.connect(function() {
  orb.startCalibration();

  setTimeout(function() {
    orb.finishCalibration();
    orb.streamAccelerometer();
    setInterval(function() {
      orb.roll(255, 0);
    }, 500);
    orb.on("accelerometer", function(data) {
      console.log("data:");
      console.log("  xAccel:", data.xAccel);
      console.log("  yAccel:", data.yAccel);
      console.log("  zAccel:", data.zAccel);
    });
  }, 5000);
});
