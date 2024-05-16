import React, { useEffect, useState } from "react";
import Web3 from "web3";
import AdditionContract from "./Addition.json";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = AdditionContract.networks[networkId];

          if (deployedNetwork) {
            const contractInstance = new web3Instance.eth.Contract(
              AdditionContract.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);

            const result = await contractInstance.methods.retrieveResult().call();
            setResult(result);
          } else {
            console.log("Smart contract not deployed to the detected network.");
          }
        } catch (error) {
          console.log("Error connecting to MetaMask or getting account information", error);
        }
      } else {
        console.log("Ethereum browser not detected! Consider installing MetaMask instead!!");
      }
    };

    initializeWeb3();
  }, []);

  const handleAddition = async () => {
    if (!contract || !number1 || !number2) return;
    try {
      await contract.methods.add(parseInt(number1), parseInt(number2)).send({ from: account });
      const updatedResult = await contract.methods.retrieveResult().call();
      setResult(updatedResult);
    } catch (error) {
      console.log("Error adding numbers:", error);
    }
  };

  const handleNumber1Change = (event) => {
    setNumber1(event.target.value);
  };

  const handleNumber2Change = (event) => {
    setNumber2(event.target.value);
  };

  return (
    <div className="App">
      <h1>Want to add some positive numbers??</h1>
      <h1>Please Enter Two positive numbers:</h1>
      <input type="number" value={number1} onChange={handleNumber1Change} />
      <br />
      <input type="number" value={number2} onChange={handleNumber2Change} />
      <button onClick={handleAddition}>Add</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default App;
