const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        // #1
        it('Whole number input', function (done) {
            assert.equal(convertHandler.getNum('2kg'), 2);
            done();
        });
        // #2
        it('正确读取一个带小数点输入', function (done) {
            assert.equal(convertHandler.getNum('2.89kg'), 2.89);
            assert.equal(convertHandler.getNum('.78kg'), 0.78);
            assert.equal(convertHandler.getNum('.7.8kg'), 'invalid number');
            done();
        });
        // #3
        it('正确读取一个分数输入', function (done) {
            assert.equal(convertHandler.getNum('2/8lbs'), 0.25);
            done();
        });
        // #4
        it('正确读取一个带小数点的分数输入', function (done) {
            assert.equal(convertHandler.getNum('2.8/8kg'), 0.35);
            assert.equal(convertHandler.getNum('2.4/.8kg'), 3);
            done();
        });
        // #5
        it('在输入双分数时返回错误', function (done) {
            assert.equal(convertHandler.getNum('2/8/8km'), 'invalid number');
            done();
        });
        // #6
        it('没有提供数字是应返回1', function (done) {
            assert.equal(convertHandler.getNum('lbs'), 1);
            done();
        });
    });
    suite('单位测试', function () {
        // #7
        it('正确读取每个有效的单位输入', function (done) {
            assert.equal(convertHandler.getUnit('34L'), 'L');
            assert.equal(convertHandler.getUnit('4.7gAl'), 'gal');
            done();
        });
        // #8
        it('在输入无效单位时返回错误', function (done) {
            assert.equal(convertHandler.getUnit('9g'), 'invalid unit');
            assert.equal(convertHandler.getUnit('78k9'), 'invalid unit');
            done();
        });
        // #9
        it('在输入有效单位时应返回正确的单位', function (done) {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
            done();
        });
        // #10
        it('正确返回每个有效输入单位的全称', function (done) {
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            done();
        })
        // #11
        it('正确地将 gal 转换为 L', function (done) {
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
            done();
        });
        // #12
        it('正确地将 L 转换为 gal', function (done) {
            assert.equal(convertHandler.convert(1, 'L'), 0.26417);
            done();
        });
        // #13
        it('正确地将 mi 转换为 km', function (done) {
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
            done();
        });
        // #14
        it('正确地将 km 转换为 mi', function (done) {
            assert.equal(convertHandler.convert(1, 'km'), 0.62137);
            done();
        });
        // #15
        it('正确地将 lbs 转换为 kg', function (done) {
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
            done();
        });
        // #16
        it('正确地将 kg 转换为 lbs', function (done) {
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
            done();
        });
    });
});