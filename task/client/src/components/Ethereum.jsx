import React, { useEffect, useState } from "react";

import { contractABI, contractAddress }from "../components/utils/constants.jsx";

const {ethereum} = window;
const Web3 = window;

const getEthereumContract = () => {
    const provider = new Web3.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const helloWorldContract = new Web3.Contract(contractAddress, contractABI, signer);

    return helloWorldContract;

};

const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [data, setData] = useState({ message: "", messageId: ""})
    const [ message, setMessage ] = useState([]);

    const handleChange = (e, name) => {
        setData((prevState) => ({ ...prevState, [name]: e.target.value}));

    };

    const getAllMessages = async () =>{
        try {
            if (!ethereum) return alert("Metamask is not installed");
            if (ethereum) {
                const helloWorldContract = getEthereumContract();
                const availableMessages = await helloWorldContract.getAllMessages();

                const structuredMessages = availableMessages.map((message) => ({
                    messageTo: message.receiver,
                    messageFrom: message.sender,
                    message: message.message,
                    messageId: message.id,
                    timeStamp: new Date(message.timeStamp.toNumber() * 1000.).toLocaleString(),
                }));

                console.log(structuredMessages);
                console.log(availableMessages);

                setMessage(structuredMessages);
            } else {
                console.log("Ethereum is not present");
                alert("Ethereum is not present");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Metamask is not installed");

            const accounts = await ethereum.request({ method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllMessages();
                console.log(currentAccount.contractAddress);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.error("No accounts found");

            throw new Error("No ethereum object if found");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllMessages();
        handleChange();

    });

    return (
        <div className="w-full m-2 p-2">
            {message}
            {data}
        </div>
    )
}

export default TransactionProvider;