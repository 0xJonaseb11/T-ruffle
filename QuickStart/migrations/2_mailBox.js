const MailBox = artifacts.require("./MailBox.sol");

module.exports = function(deployer) {
    deployer.deploy(MailBox);
};

