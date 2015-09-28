var expect = require('chai').expect;
var env_deploy = require('../..');

function clearEnv() {
    //process.env = {}
    // no use
}

describe('with env use json format', function() {
    var env = process.env;
    before('clear env', clearEnv);
    it('should be load .env success', function() {
        var result = env_deploy(__dirname);
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

describe('with env use key=value format', function() {
    var env = process.env;
    before('clear env', clearEnv);

    it('should be load .env success', function() {
        expect(env_deploy(__dirname + '/.env-key-value')).to.be.ok;
    });

    it('right value', function() {
        expect(env).to.be.contains({
            FIRST: '1',
            SECOND: 'two',
            WITHEQL: 'la la = 123'
        });
    });

    it('invalid value', function() {
        expect(env).to.be.not.contains({
            ERR: null
        });
    });
});

describe('set autoTransformCase to false', function() {
    var env = process.env;
    before('load', function() {
        env_deploy(__dirname + '/.env-key-value', {
            autoTransformCase: false
        });
    });

    it('test', function() {
        expect(env).to.be.contains({
            first: '1',
            second: 'two',
            withEql: 'la la = 123'
        });
    });
});