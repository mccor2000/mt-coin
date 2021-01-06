const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const keys = ec.genKeyPair();
const publicKey = keys.getPublic("hex");
const privateKey = keys.getPrivate("hex");

console.log(`Private key: ${privateKey}\n`);
console.log(`Public key: ${publicKey}\n`);
