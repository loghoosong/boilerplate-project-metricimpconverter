function ConvertHandler() {
  const unitsConfig = {
    gal: ['gallons', 'L'],
    L: ['liters', 'gal'],
    lbs: ['pounds', 'kg'],
    kg: ['kilograms', 'lbs'],
    mi: ['miles', 'km'],
    km: ['kilometers', 'mi'],
  }

  this.invalidNumber = 'invalid number';
  this.invalidUnit = 'invalid unit';

  this.getNum = function (input) {
    let result;
    const str = input.match(/^[0-9./]*/)[0];
    if (str === '') {
      result = 1;
    } else {
      const split = str.split('/');
      if (split.length === 1) {
        result = + split[0];
      } else if (split.length === 2) {
        //先四舍五入到5位小数，再通过parseFloat去掉尾部的0
        result = +parseFloat((+split[0] / +split[1]).toFixed(5));
      }
    }
    return result ? result : this.invalidNumber;
  };

  this.getUnit = function (input) {
    let unit = input.match('[a-zA-Z].*$')[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    return unitsConfig.hasOwnProperty(unit)
      ? unit
      : this.invalidUnit;
  };

  this.getReturnUnit = function (initUnit) {
    return unitsConfig[initUnit][1];
  };

  this.spellOutUnit = function (unit) {
    return unitsConfig[unit][0];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
    }
    return +result.toFixed(5);
  };

  this.getString = function (initNum, initUnitString, returnNum, returnUnitString) {
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };

}

module.exports = ConvertHandler;
