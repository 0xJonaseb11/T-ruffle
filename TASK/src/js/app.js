import React, {useState, useEffect } from 'react';
import { contractABI, contractAddress }from "../components/utils/constants.jsx";
import Ethereum from "../components/Ethereum.jsx";
import EthereumObject from "../components/EthereumObject.jsx";



const App = () => {
  const user = "user_name"; 
  const Web3 = window.ethereum;
  const {ethereum} = window;
  const [message, setMessage] = useState(`Hello, ${user}`);

  const ConnectWallet = async () => {
    if (!ethereum) {
      return alert("Metamask is not installed. Please try installing it to connect your wallet!");
    }
    if (ethereum) {
    try {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      alert ("Connected to Metamask successfully");

      /** More account[0] details */
      

    } catch (error) {
      console.error("Error while connecting to Metamsk!", error);
      alert("Failed to connect to metamask. Please check your browser Metamask extension");
    }
  } else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')

  }

  const getEthereumContract = () => {
    const provider = new Web3.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const helloWorldContract = new Web3.Contract(contractAddress, contractABI, signer);

    return helloWorldContract;

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    loadMessage();
    getAllMessages();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMessage = async () => {
    const newMessage = prompt("Enter new message");

    if (newMessage) {
      setMessage(newMessage);
      loadMessage();
      getAllMessages();
    }
  };

  const updates = () => {
    if (!ethereum) return alert("Metamask is not installed");
  
    if (window.ethereum) {
      try {
        ConnectWallet();
        alert("Metamask is")
      } catch (error) {
        console.error("Wallet connect failed");
      }
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')

    }
    
    setMessage(message);
  };
  

  <div>
    <Ethereum/>
    <EthereumObject/>
    <Ethereum/>
    

  </div>
  return (
    <div>
      <h1>Hello World, {user}</h1>
    <p>Current Message: {message}</p>
    <button onClick={ConnectWallet}> connect wallet</button>
    
    </div>
    
  );
  }
} 

export default App;