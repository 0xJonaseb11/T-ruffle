const HelloWorld = artifacts.require("HelloWorld");

module.exports = ((deployer) => {
    deployer.deploy(HelloWorld);
});

