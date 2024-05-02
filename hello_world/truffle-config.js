module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    "development": {
      network_id: 5777,
      host: "127.0.0.1",
      port: 7545
    },
  },
  compilers: {
    solc: {
      version: "0.8.19" //
    }
  }
};
