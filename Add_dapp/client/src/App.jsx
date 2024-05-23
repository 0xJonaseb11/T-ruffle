import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// ABI of the smart contract
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "num2",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSum",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "result",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0xAC8a52A49F95B93FC60165A580B499aE48d21065';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setWeb3(web3);
          setAccounts(accounts);
          setContract(contract);
          console.log('Web3, accounts, and contract initialized');
          console.log('Web3:', web3);
          console.log('Accounts:', accounts);
          console.log('Contract:', contract);
        } catch (error) {
          console.error("Error connecting to Metamask", error);
        }
      } else {
        console.error("Ethereum wallet is not detected!");
      }
    }

    init();
  }, []);

  const handleAdd = async () => {
    if (contract && accounts.length > 0) {
      try {
        console.log(`Adding ${num1} and ${num2}`);
        await contract.methods.add(num1, num2).send({ from: accounts[0] });
        fetchResult();
      } catch (error) {
        console.error('Error adding numbers:', error);
      }
    } else {
      console.log('Contract or accounts not properly initialized');
    }
  };

  const fetchResult = async () => {
    if (contract) {
      try {
        console.log('Fetching result...');
        const res = await contract.methods.getSum().call({ from: accounts[0] });
        console.log("Result fetched successfully:", res);
        setResult(res);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    } else {
      console.log('Contract not properly initialized');
    }
  };

  console.log("Rendered Result:", result);

  return (
    <div className="App">
      <h1>Simple Addition DApp</h1>
      <div>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
        />
        <br />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <button onClick={fetchResult}>Get Result</button>
        <h2>Result: {String(result)}</h2>
      </div>
    </div>
  );
}

export default App;
