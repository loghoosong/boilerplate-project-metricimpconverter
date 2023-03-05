const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('数字测试', function () {
        //#1
        it('正确读取整个数据输入', function () {
            assert.equal(convertHandler.getNum('2kg'), 2);
        });
        //#2
        it('正确读取一个带小数点输入', function () {
            assert.equal(convertHandler.getNum('2.89kg'), 2.89);
            assert.equal(convertHandler.getNum('.78kg'), 0.78);
            assert.equal(convertHandler.getNum('.7.8kg'), 'invalid number');
        });
        //#3
        it('正确读取一个分数输入', function () {
            assert.equal(convertHandler.getNum('2/8lbs'), 0.25);
        });
        //#4
        it('正确读取一个带小数点的分数输入', function () {
            assert.equal(convertHandler.getNum('2.8/8kg'), 0.35);
            assert.equal(convertHandler.getNum('2.4/.8kg'), 3);
        });
        //#5
        it('在输入双分数时返回错误', function () {
            assert.equal(convertHandler.getNum('2/8/8km'), 'invalid number');
        });
        //#6
        it('没有提供数字是应返回1', function () {
            assert.equal(convertHandler.getNum('lbs'), 1);
        });
    });
    suite('单位测试', function () {
        //#7
        it('正确读取每个有效的单位输入', function () {
            assert.equal(convertHandler.getUnit('34L'), 'l');
            assert.equal(convertHandler.getUnit('4.7gAl'), 'gal');
        });
        //#8
        it('在输入无效单位时返回错误', function () {
            assert.equal(convertHandler.getUnit('9g'), 'invalid unit');
            assert.equal(convertHandler.getUnit('78k9'), 'invalid unit');
        });
        //#9
        it('在输入有效单位时应返回正确的单位', function () {
            assert.equal(convertHandler.getReturnUnit('l'), 'gal');
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        });
        //#10
        it('正确返回每个有效输入单位的全称', function () {
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        })
        //#11
        it('正确地将 gal 转换为 L', function () {
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
        });
        //#12
        it('正确地将 L 转换为 gal', function () {
            assert.equal(convertHandler.convert(1, 'l'), 0.26417);
        });
        //#13
        it('正确地将 mi 转换为 km', function () {
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
        });
        //#14
        it('正确地将 km 转换为 mi', function () {
            assert.equal(convertHandler.convert(1, 'km'), 0.62137);
        });
        //#15
        it('正确地将 lbs 转换为 kg', function () {
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
        });
        //#16
        it('正确地将 kg 转换为 lbs', function () {
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
        });
    });
});