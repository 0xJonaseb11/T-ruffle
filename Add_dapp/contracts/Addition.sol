// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Addition {

    // state variables
    uint256 public result;
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // add operation
    function add(uint256 _num1, uint256 _num2) public /*onlyOwner*/ {
        result = _num1 + _num2;
    }

    function retrieveResult() public view returns(uint256) {
        return result;
    }
}