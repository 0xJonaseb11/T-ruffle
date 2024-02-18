import React from "react";

import Web3 from 'web3'

let web3;

const ConnectWallet = async () => {

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts'});
    } catch (error) {
        console.error("User denied Account Access");
    }
} else if (window.web3) {
    /** legacy browsers*/
    web3 = new Web3(window.web3.currentProvider);
} else {
    /** Non-dapp browsers*/
    console.log('Non-ethereum browser detected, Try installing metamast!');
}

}

export default web3;