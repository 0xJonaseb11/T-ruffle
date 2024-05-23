// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Addition {

  uint256 public result;

  function add(uint256 num1, uint256 num2) public {
    result = num1 + num2;
  }

  function getSum() public view returns(uint256) {
    return result;
  }
}