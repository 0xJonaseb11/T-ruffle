// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract HelloWorld {
  
  string private message;
  address private owner;

  event MessageUpdated(string newMessage);

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  constructor(string memory initialMessage) {
    message = initialMessage;
    owner = msg.sender;
  }

  function getCurrentMessage() external view returns(string memory) {
    return message;
  }

  function setMessage(string calldata _message) external onlyOwner {
    message = _message;
    emit MessageUpdated(_message);
  }
}
