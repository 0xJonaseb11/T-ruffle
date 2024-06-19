import React, { useState, useEffect } from "react";
import Web3 from "web3";
import HelloWorldContract from "./HelloWorld.json";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [storedName, setStoredName] = useState("");
  const [newName, setNewName] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = HelloWorldContract.networks[networkId];

          if (deployedNetwork) {
            const contractInstance = new web3Instance.eth.Contract(
              HelloWorldContract.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
          } else {
            console.error("Contract not deployed on the detected network.");
          }
        } catch (error) {
          console.error("Error connecting to MetaMask or getting account information:", error);
        }
      } else {
        console.error("MetaMask not detected.");
      }
    };

    initWeb3();
  }, []);

  const handleSetName = async () => {
    if (!contract || !account) return;
    try {
      await contract.methods.setGreeting(newName).send({ from: account, gas: 3000000 });
      setNewName("");
    } catch (error) {
      console.error("Error setting name:", error);
    }
  };

  const handleGetName = async () => {
    if (!contract) return;
    try {
      const name = await contract.methods.getGreeting().call();
      setStoredName(name);
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px'}} className="App">
      <h1 
      style={{margin: 10, display: "flex", marginBottom: 20}}
      >Hello World, {storedName}!</h1>
      <input
        type="text"
        value={newName}
        onChange={handleInputChange}
        placeholder="Enter your name here"
        className="box"
      />
      <button onClick={handleSetName}>Set Name</button>
      <button onClick={handleGetName}>Get Name</button>
      <input
        type="text"
        value={storedName}
        readOnly
        placeholder="Retrieved name will appear here"
        className="box"
      />
    </div>
  );
}

export default App;
