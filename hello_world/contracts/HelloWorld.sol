// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    
    // state variables
    string public greeting;

    constructor () {
        
        greeting = "Hello, world!";
    }

    function getGreeting() public view returns(string memory) {
        return greeting;
    }

    function setGreeting(string calldata _newGreeting) public {
        greeting = _newGreeting;
    }

}