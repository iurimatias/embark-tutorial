var assert = require('assert');
var Embark = require('embark-framework');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("token", function(done) {
  before(function(done) {
    EmbarkSpec.deployAll(done);
  });

  it("should start with an empty balance", function(done) {
    token.coinBalanceOf(web3.eth.accounts[0], function(err, result) {
      assert.equal(result.toNumber(), 10001);
      done();
    });
  });

  it("should send funds", function(done) {
    token.sendCoin("0x123", 1000, function() {
      token.coinBalanceOf("0x123", function(err, result) {
        assert.equal(result.toNumber(), 1000);
      });
      token.coinBalanceOf(web3.eth.accounts[0], function(err, result) {
        assert.equal(result.toNumber(), 9001);
        done();
      });
    });
  });

})
