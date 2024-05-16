const Addition = artifacts.require("Addition");

module.exports = ((deployer) => {
    deployer.deploy(Addition);
})
