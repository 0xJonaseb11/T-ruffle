import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import HelloWorldContract from './contracts/HelloWorld.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Connect to MetaMask or other Ethereum provider
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = HelloWorldContract.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            HelloWorldContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(contractInstance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetchCurrentMessage = async () => {
      if (contract) {
        const message = await contract.methods.getCurrentMessage().call();
        setCurrentMessage(message);
      }
    };

    fetchCurrentMessage();
  }, [contract]);

  const setMessage = async () => {
    if (contract && account) {
      try {
        await contract.methods.setMessage(newMessage).send({ from: account });
        setCurrentMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Current Message: {currentMessage}</h1>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={setMessage}>Set Message</button>
    </div>
  );
};

export default App;
