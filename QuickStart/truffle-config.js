require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env;



module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // loalhost
      port: 7545, // avoid collision of ports.
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.21"
    }
  }
};
