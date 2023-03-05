'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    console.log(initUnit);
    if (initNum == convertHandler.invalidNumber) {
      if (initUnit == convertHandler.invalidUnit) {
        res.send('invalid number and unit');
      } else {
        res.send(initNum);
      }
      return;
    } else if (initUnit == convertHandler.invalidUnit) {
      res.send(initUnit);
      return;
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    res.json({
      initNum, initUnit, returnNum, returnUnit,
      string: convertHandler.getString(
        initNum,
        convertHandler.spellOutUnit(initUnit),
        returnNum,
        convertHandler.spellOutUnit(returnUnit),
      ),
    });
  });
};
