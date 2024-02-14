const Adoption = artifacts.require("Adoption");

contract ("Adoption", (accounts) => {
    let adoption;
    let expectedPetId;

    before( async () => {
        adoption = await Adoption.deployed();
    });

    describe("adopting a pet and retrieving account address", async() => {
        before("Adopt pet using accounts[0]", async() => {
            await adoption.adopt(8, { from: accounts[0] });
            expectedAdopter = accounts[0];
        });

        // Test adopt() function
        describe("Adopting a pet and retrieving account addresses", async() => {
            before("Adopt pet using accounts[0]", async () => {
                await adoption.adopt(8, { from: accounts[0] });
                expectedAdopter = accounts[0];
            });
            it ("Can fetch the address of the owner by pet Id", async() => {
                const adopter = await adoption.adopters(8);

                assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account");
            });
            
            // Test retrieval of all pet owners
            it("can fetch the collection of all pet owners' addresses", async() => {
                const adopters = await adoption.getAdopters();

                assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in a collection");
            });
        });
    });
});