
var event = token.CoinTransfer({}, '', function(error, result){
  if (!error)
    console.log("Coin transfer: " + result.args.amount + " tokens were sent. Balances now are as following: \n Sender:\t" + result.args.sender + " \t" + token.coinBalanceOf.call(result.args.sender) + " tokens \n Receiver:\t" + result.args.receiver + " \t" + token.coinBalanceOf.call(result.args.receiver) + " tokens" )
});

// token.coinBalanceOf(web3.eth.accounts[0]).toNumber()
// token.sendCoin("0x123", 1000)

var event = Crowdsale.FundTransfer({}, '', function(error, result){
  if (!error)

    if (result.args.isContribution) {
      console.log("\n New backer! Received " + web3.fromWei(result.args.amount, "ether") + " ether from " + result.args.backer  )

      console.log( "\n The current funding at " +( 100 *  Crowdsale.amountRaised.call() / Crowdsale.fundingGoal.call()) + "% of its goals. Funders have contributed a total of " + web3.fromWei(Crowdsale.amountRaised.call(), "ether") + " ether.");

      var timeleft = Math.floor(Date.now() / 1000)-Crowdsale.deadline();
      if (timeleft>3600) {  console.log("Deadline has passed, " + Math.floor(timeleft/3600) + " hours ago")
      } else if (timeleft>0) {  console.log("Deadline has passed, " + Math.floor(timeleft/60) + " minutes ago")
      } else if (timeleft>-3600) {  console.log(Math.floor(-1*timeleft/60) + " minutes until deadline")
      } else {  console.log(Math.floor(-1*timeleft/3600) + " hours until deadline")
      }

    } else {
      console.log("Funds transferred from crowdsale account: " + web3.fromWei(result.args.amount, "ether") + " ether to " + result.args.backer  )
    }

});

//token.sendCoin.sendTransaction(Crowdsale.address, 5000,{from: web3.eth.accounts[0]});

console.log("Current crowdsale must raise " + web3.fromWei(Crowdsale.fundingGoal.call(), "ether") + " ether in order to send it to " + Crowdsale.beneficiary.call() + ".");

var amount = web3.toWei(5, "ether");
web3.eth.sendTransaction({from: web3.eth.accounts[0], to: Crowdsale.address, value: amount, gas: 1000000});

