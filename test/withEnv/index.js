var expect = require('chai').expect;

describe('with env', function() {
    before('clear env', function() {
        delete process.env.NODE_ENV;
        delete process.env.MONGODB;
    });
    it('should be load .env success', function() {
        var result = require('../../')(__dirname);
        expect(result).to.be.ok;
    });
    it('base check', function() {
        expect(process.env.NODE_ENV).to.be.eql('production');
        expect(process.env.MONGODB).to.be.eql('localhost');
    });
    it('nested obejct to check', function() {
        expect(process.env.A_B).to.be.eql('b');
        expect(process.env.A_C_D).to.be.eql('1');
    });
});