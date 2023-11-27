module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // loalhost
      port: 8545, // avoid collision of ports.
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.21"
    }
  }
};
