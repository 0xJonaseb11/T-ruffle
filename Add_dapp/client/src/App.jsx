import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import AdditionContract from "./Addition.json"; // Import your contract JSON

function App() {
  const [_num1, setNum1] = useState(0);
  const [_num2, setNum2] = useState(0);
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
        console.log("Network ID:", networkId);
        const deployedNetwork = AdditionContract.networks[networkId];
        console.log("Deployed Network:", deployedNetwork);
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
      if (!contract) {
        console.error("Contract not initialized!");
        return;
      }
  
      // Send the transaction to add the numbers
      await contract.methods.add(_num1, _num2).send({ from: "0x53298B7Af38945A04352C68F0D652FC875992D0e" });
  
      // Retrieve the result after the transaction is mined
      const newResult = await contract.methods.retrieveResult().call();
      setResult(newResult);
      console.log(newResult)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="App">
      <h1>Simple Addition DApp</h1>
      <input
        type="number"
        value={_num1}
        onChange={(e) => setNum1(parseInt(e.target.value))}
      />
      <input
        type="number"
        value={_num2}

        onChange={(e) => setNum2(parseInt(e.target.value))}
      />
      <button onClick={handleAddition}>Add</button>
      <div>Result: {result}</div>
    </div>
  );
}

export default App;
