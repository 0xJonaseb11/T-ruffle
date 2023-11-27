const Mailbox = artifacts.require("./Mailbox.sol");

module.exports = function(deployer) {
    deployer.deploy(Mailbox);
};