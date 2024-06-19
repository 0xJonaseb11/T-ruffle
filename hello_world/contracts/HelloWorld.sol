// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    string private name;

    // Function to set the name
    function setName(string memory newName) public {
        name = newName;
    }

    // Function to get the name
    function getName() public view returns (string memory) {
        return name;
    }
}
