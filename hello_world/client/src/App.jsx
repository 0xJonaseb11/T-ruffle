import React, { useState, useEffect } from "react";
import Web3 from "web3";
import HelloWorldContract from "../../build/contracts/HelloWorld.json";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [newGreeting, setNewGreeting] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = HelloWorldContract.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            HelloWorldContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
          const greeting = await contractInstance.methods.getGreeting().call();
          setGreeting(greeting);
        } catch (error) {
          console.error("Error connecting to MetaMask or getting account information:", error);
        }
      } else {
        console.error("MetaMask not detected.");
      }
    };

    initWeb3();
  }, []);

  const handleSetGreeting = async () => {
    if (!contract) return;
    try {
      await contract.methods.setGreeting(newGreeting).send({ from: account });
      const updatedGreeting = await contract.methods.getGreeting().call();
      setGreeting(updatedGreeting);
    } catch (error) {
      console.error("Error setting greeting:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewGreeting(event.target.value);
  };

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <p><i className="font-bold text-green text-3xl">Enter greeting message: </i> {greeting}</p>
      <input type="text" value={newGreeting} onChange={handleInputChange} />
      <button onClick={handleSetGreeting}>Set Greeting</button>
    </div>
  );
}

export default App;
