
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract HelloWorld {
  
  /**state variables*/
  string private message;
  uint256 messageId;
  address owner;

  /**events*/
  event MessageUpdated(string indexed new_message);

  /** errors */
  error MessageTriggerFailed();

  /** initialize contract message*/
  constructor(string memory initial_message) {
    message = initial_message;
  }

  /** modifiers - permission access */
  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  /**get current[initial] message*/
  function get_current_message () external view returns(string memory) {
    return message;
  }

  /**set message*/
  function setMessage(string calldata _message) external onlyOwner {
    message = _message;
    emit MessageUpdated(_message);
  }
}