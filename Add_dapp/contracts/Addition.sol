// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Addition {

    // state variable
    uint256 public result;

    // add operation
    function add(uint256 _num1, uint256 _num2) public {
        result = _num1 + _num2;
    }

    // Retrieve result
    function retrieveResult() public view returns(uint256) {
        return result;
    }
}
