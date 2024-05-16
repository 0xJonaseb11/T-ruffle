import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import AdditionContract from "./Addition.json"; // Import your contract JSON

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        // Initialize Web3
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }

        // Initialize contract
        const networkId = await window.web3.eth.net.getId();
        const deployedNetwork = AdditionContract.networks[networkId];
        const instance = new window.web3.eth.Contract(
          AdditionContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    init();
  }, []);

  const handleAddition = async () => {
    try {
      await contract.methods.add(num1, num2).send({ from: window.web3.eth.defaultAccount });
      const newResult = await contract.methods.retrieveResult().call();
      setResult(newResult);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Simple Addition DApp</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(parseInt(e.target.value))}
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(parseInt(e.target.value))}
      />
      <button onClick={handleAddition}>Add</button>
      <div>Result: {result}</div>
    </div>
  );
}

export default App;