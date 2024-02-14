// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import { Assert } from "truffle/Assert.sol";
import { DeployedAddresses } from "truffle/DeployedAddresses.sol";
import { Adoption } from "../contracts/Adoption.sol";

contract TestAdoption {

    // Address of the adoption contract to be tested
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    // Id of the pet that will be used for testing
    uint expectedPetId = 8;

    // Exected owner of adopted pet is this contract
    address expectedAdopter = address(this);


    // Testing the adopt() function
    function testUserCanAdoptPet() public {
        uint returnedId = adoption.adopt(expectedPetId);

        Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned");
    }

    // Testing he retrieval of a single pet's owner
    function testGetAdopterAddressByPetId() public {
        address adopter = adoption.adopters(expectedPetId);

        Assert.equal(adopter, expectedAdopter, "The owner of the expected pet should be this contract");
    }

    // Testing retrieval of of all pet owners
    function testGetAdopterAddressByPetIdInArray() public {
        // store address in memory rather that storage
        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[expectedPetId], expectedAdopter, "The owner of the expected pet should be this contract.");
    }
}