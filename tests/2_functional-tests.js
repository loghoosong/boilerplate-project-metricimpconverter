const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    this.timeout(5000);
    // #1
    it('转换一个有效的输入', function () {
        chai.request(server).get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "initNum": 10,
                    "initUnit": "L",
                    "returnNum": 2.64172,
                    "returnUnit": "gal",
                    "string": "10 liters converts to 2.64172 gallons"
                });
                done();
            });
    });
    // #2
    it('转换一个无效的单位', function () {
        chai.request(server)
            .get('/api/convert').query({ input: '32g' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            });
    });
    // #3
    it('转换一个无效的数字', function () {
        chai.request(server)
            .get('/api/convert').query({ input: '3/7.2/4kg' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            });
    });
    // #4
    it('转换一个无效的数字和单位', function () {
        chai.request(server)
            .get('/api/convert').query({ input: '3/7.2/4kilomegagram' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            });
    });
    // #4
    it('转换时没有数字', function () {
        chai.request(server)
            .get('/api/convert?').query({ input: 'mi' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    "initNum": 1,
                    "initUnit": "mi",
                    "returnNum": 1.60934,
                    "returnUnit": "km",
                    "string": "1 miles converts to 1.60934 kilometers"
                });
            });
    });

});
