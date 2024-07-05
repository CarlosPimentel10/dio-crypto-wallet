// import dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// define network
// bitcoin - main network - mainnet
// testnet - test network - testnet
const network = bitcoin.networks.testnet

// HD wallets deriving 
const path = `m/49'/1'/0'/0`

// creating the mnemonic to the seed (pass key words)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// creating the root of the HD wallet
let root = bip32.fromSeed(seed, network)

// creating an account - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

// display wallet data
console.log("Generated Wallet")
console.log("Address: ", btcAddress)
console.log("Private key: ", node.toWIF())
console.log("Seed", mnemonic)