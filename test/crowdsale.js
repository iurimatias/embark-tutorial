var assert = require('assert');
var Embark = require('embark-framework');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("crowdsale", function(done) {
  before(function(done) {
    EmbarkSpec.deployAll(done);
  });

  it("have the address of the token", function(done) {
    Crowdsale.tokenReward(function(err, result) {
      assert.equal(result, token.address);
      done();
    });
  });

  it("keep track of amount raised", function(done) {
    var amount = web3.toWei(5, "ether");
    web3.eth.sendTransaction({from: web3.eth.accounts[0], to: Crowdsale.address, value: amount, gas: 1000000}, function(err, result) {
      Crowdsale.amountRaised(function(err, result) {
        assert.equal(result.toString(), amount);
        done();
      });
    });
  });

})
