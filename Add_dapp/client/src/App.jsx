import react, { useEffect, useState } from "react";
import Web3 from "web3";

import AdditionContract from "./Addition.json";

const App = () => {
  
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [result, setResult] = useState("");
  const [newResult, setNewResult] = useState();
  const [account, setAccount] = useState();

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
        const chainId = await web3Instance.eth.getChainId();

        const deployedNetwork = AdditionContract.networks[networkId];

        const contractInstance = new web3Instance.eth.Contract(
          AdditionContract.abi, 
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);

        // Addition logic
        const result = await contractInstance.methods.retrieveResult().call();
        setResult(result);
      } catch (error) {
        console.log("Error connecting to MetaMask or getting account information");
      }
    } else {
      console.log("Ethereum browser not detected! Consider installing MetaMask instead!!");
    }
  };
  
  initializeWeb3();
 }, []);

 const handleAddition = async() => {
  if (!contract) return;
    try {
      await contract.methods.setResult(result).send({from: account});
      const updatedResult = await contract.methods.retrieveResult().call();
      setResult(updatedResult);
    } catch (error) {
      console.log("Error getting result of provided numbers!!", error);
    }
 };


  const handleInputChange = ((event) => {
   setResult(event.target.value);
  });

  return (
    <div className="App">
      <h1 style>Want to add some positive numbers??</h1>
      <h1>Please Enter Two positive numbers:</h1>
      <input type="number" value={result} onChange={handleInputChange}/>
      <button onClick={handleAddition}>Add</button>
    </div>
  );
}

export default App;