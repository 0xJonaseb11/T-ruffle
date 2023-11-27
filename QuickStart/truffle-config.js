require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env;

// wallet provider
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
  //   development: {
  //     host: "127.0.0.1", // loalhost
  //     port: 7545, // avoid collision of ports.
  //     network_id: "*" // Match any network id
  //   }
  // },

  sepolia: {
    provider: () => new HDWalletProvider(MNEMONIC, `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`),
    network_id: 11155111,
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true
  },
  compilers: {
    solc: {
      version: "^0.8.21"
    }
  }
};
