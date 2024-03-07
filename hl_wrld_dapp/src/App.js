import React, { useState } from 'react'
import { ethers } from 'ethers'
import StoreContractABI from './artifacts/contracts/Store.sol/Store.json'
import './App.css'

const STORE_CONTRACT_ADDRESS = 'Your Contract address'

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [storeContract, setStoreContract] = useState(null)
  const [valueFromStoreContract, setValueFromStoreContract] = useState('')

  const walletConnector = () => {
    if (window.ethereum) {
      //metamask there
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          setAccount(result[0])

          window.ethereum
            .request({
              method: 'eth_getBalance',
              params: [result[0], 'latest']
            })
            .then((balance) => {
              setBalance(ethers.utils.formatEther(balance))
            })
        })
    }
  }

  const [inputText, setInputText] = useState('')

  const handleStoreValueClick = () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const sign = provider.getSigner()

      const contract = new ethers.Contract(
        STORE_CONTRACT_ADDRESS,
        StoreContractABI.abi,
        sign
      )
      contract.set(inputText)
    }
  }

  const handleGetValueFromContract = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        STORE_CONTRACT_ADDRESS,
        StoreContractABI.abi,
        provider
      )

      const getDataFromStoreContract = await contract.get()

      setValueFromStoreContract(getDataFromStoreContract)
    }
  }

  return (
    <div className="App">
      <h1>Connect MetaMask</h1>
      <button onClick={walletConnector}>
        Connect me with By window Ethereum Method
      </button>
      <h3>User Account address: </h3>
      <h3>{account}</h3>
      <h3>User Balance</h3>
      <h3>{balance}</h3>

      <div>
        <h3>Simple Contract Store App</h3>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleStoreValueClick}>
          Store the value to the Contract
        </button>
        <br />
        <button onClick={handleGetValueFromContract}>
          Get stored value from Contract
        </button>
        <h3>{valueFromStoreContract}</h3>
      </div>
    </div>
  )
}

export default App
