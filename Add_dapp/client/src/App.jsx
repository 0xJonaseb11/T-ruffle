import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AdditionContract from '../';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        alert('Non-Ethereum browser detected. Consider installing MetaMask!');
        return;
      }
      setWeb3(web3);
      console.log('Web3 instance:', web3);
    };

    const loadBlockchainData = async (web3) => {
      const accounts = await web3.eth.getAccounts();
      console.log('Accounts:', accounts);
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      console.log('Network ID:', networkId);

      const networkData = AdditionContract.networks[networkId];
      if (networkData) {
        const abi = AdditionContract.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        console.log('Contract:', contract);
        setContract(contract);
      } else {
        alert('Smart contract not deployed to detected network.');
      }
    };

    const init = async () => {
      await initWeb3();
      if (web3) {
        await loadBlockchainData(web3);
      }
    };

    init();
  }, [web3]);

  useEffect(() => {
    console.log('Web3 instance:', web3);
    console.log('Account:', account);
    console.log('Contract:', contract);
  }, [web3, account, contract]);

  const handleAddition = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        console.log('Calling add method with:', num1, num2);
        const result = await contract.methods.add(parseInt(num1), parseInt(num2)).call();
        console.log('Addition result:', result);
        setSum(result);
      } catch (error) {
        console.error('Error calling the add method:', error);
      }
    }
  };

  return (
    <div>
      <h1>Web3 Addition DApp</h1>
      <p>Account: {account}</p>
      <form onSubmit={handleAddition}>
        <div>
          <label>Number 1: </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </div>
        <div>
          <label>Number 2: </label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {sum !== null && (
        <div>
          <h2>Sum: {sum}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
