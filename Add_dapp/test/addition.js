const addition = artifacts.require("addition");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("addition", function (/* accounts */) {
  it("should assert true", async function () {
    await addition.deployed();
    return assert.isTrue(true);
  });
});
