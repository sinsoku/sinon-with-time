try {
  var time = require("time");
  var sinon = require("sinon");

  var original = {
    Date: time.Date,
    useFakeTimers: sinon.useFakeTimers
  };

  sinon.useFakeTimers = function() {
    clock = original.useFakeTimers.apply(sinon, arguments);
    time.Date = time.extend(Date);

    original.restore = clock.restore

    clock.restore = function() {
      time.Date = original.Date;
      sinon.useFakeTimers = original.useFakeTimers;

      original.restore.apply(clock);
    }

    return clock;
  }
} catch (e) {
}
