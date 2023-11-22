// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MailBox {
    string public mail;
    uint public mailCount;
    bool isInitialMail;
    address senderAddress;

    constructor(string memory initialMail) {
        mail= initialMail;
        isInitialMail = true;
        mailCount++;
        senderAddress = msg.sender;
    }

    function setMail(string memory newMail) public {
        mail = newMail;
        isInitialMail = false;
        mailCount++;
    }

    function getAddress() public view returns(address) {
        return senderAddress;

    }


}