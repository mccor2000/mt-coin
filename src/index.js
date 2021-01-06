const { Transaction, BlockChain } = require("./blockchain");

let qtCoin = new BlockChain();

qtCoin.createTransaction(new Transaction("address1", "address2", 100));
qtCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log(`Starting the miner...`);
qtCoin.minePendingTransaction("mccor-address");
console.log(
  `Mccor's balance is ${qtCoin.getBalanceOfAddress("mccor-address")}`
);
console.log(`address1's balance is ${qtCoin.getBalanceOfAddress("address1")}`);
console.log(`address2's balance is ${qtCoin.getBalanceOfAddress("address2")}`);

qtCoin.createTransaction(new Transaction("null", "address1", 75));
console.log(`Starting the second miner...`);
qtCoin.minePendingTransaction(null);
console.log(
  `Mccor's balance is ${qtCoin.getBalanceOfAddress("mccor-address")}`
);
console.log(`address1's balance is ${qtCoin.getBalanceOfAddress("address1")}`);
console.log(`address2's balance is ${qtCoin.getBalanceOfAddress("address2")}`);
