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
    it('check', function() {
        expect(process.env.NODE_ENV).to.be.eql('production');
        expect(process.env.MONGODB).to.be.eql('localhost');
    });
});