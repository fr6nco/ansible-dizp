const util = require("util");

const prefixZero = (value) => {
  if (value < 10) {
    return "0" + value;
  }
  return value;
};

const generate = (previousSerial) => {
  if (!/^[0-9]{10}$/i.test(previousSerial)) {
    previousSerial = null;
  }
  const previousDateStamp = previousSerial ? previousSerial.substring(0, 8) : null;
  const previousSerialCounter = previousSerial ? Number.parseInt(previousSerial.substring(8, 10)) : null;

  const currentDate = new Date();
  const currentDateStamp = util.format(
    "%s%s%s",
    prefixZero(currentDate.getFullYear()),
    prefixZero(currentDate.getMonth() + 1),
    prefixZero(currentDate.getDate())
  );

  if (previousSerial && previousDateStamp === currentDateStamp) {
    return util.format("%s%s", currentDateStamp, prefixZero(previousSerialCounter + 1));
  } else {
    return util.format("%s01", currentDateStamp)
  }
};

console.log(generate(process.argv[2] || null));