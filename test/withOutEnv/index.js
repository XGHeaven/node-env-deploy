var expect = require('chai').expect;

describe('without env', function() {
    before('clear env', function() {
        delete process.env.NODE_ENV;
        delete process.env.MONGODB;
    });
    it('don\'t find it', function() {
        var result = require('../../')(__dirname);
        expect(result).to.be.not.ok;
    });
    it('check', function() {
        expect(process.env.NODE_ENV).to.be.undefined;
        expect(process.env.MONGODB).to.be.undefined;
    });
});