const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddr, toAddr, amount) {
    this.fromAddr = fromAddr;
    this.toAddr = toAddr;
    this.amount = amount;
  }

  calculateHash() {
    return SHA256(this.fromAddr + this.toAddr + this.amount).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddr) {
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
    console.log(`Nonce: ${this.nonce}`);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransaction = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("26/12/2020", []);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransaction);
    block.mineBlock(this.difficulty);

    console.log(`Block successfully mined!`);
    this.chain.push(block);
    this.pendingTransaction = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transactions) {
    this.pendingTransaction.push(transactions);
  }

  getBalanceOfAddress(address) {
    return this.chain.reduce((currentBalance, currentBlock) => {
      return currentBlock.transactions.reduce(
        (currentAmount, currentTransaction) => {
          if (currentTransaction.fromAddr === address)
            return currentAmount - currentTransaction.amount;

          if (currentTransaction.toAddr === address)
            return currentAmount + currentTransaction.amount;

          return currentAmount;
        },
        currentBalance
      );
    }, 0);
  }

  isChainValid() {
    return this.chain.every((currentBlock, idx, chain) => {
      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      if (idx === chain.length - 1) return true;

      if (currentBlock.hash !== chain[idx + 1].previousHash) return false;

      return true;
    });
  }
}

module.exports.Transaction = Transaction;
module.exports.BlockChain = BlockChain;
