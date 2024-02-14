// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Adoption {
    
    // state variables
    address[16] public adopters;

    /*********** Execute functios ************/

    // adopt a pet
    function adopt(uint petId) public returns(uint) {
        require(petId >= 0 && petId <= 15, "Invalid pet ID");

        adopters[petId] = msg.sender;
        
        return petId;
    }

    /********** Query functions ************/
    
    // Retrive adopters
    function getAdopters() public view returns(address[16] memory) {
        return adopters;
    }
}