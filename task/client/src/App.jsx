import React, {useState, useEffect } from 'react';
import { getCurrentMessage, setMessage } from "./components/ContractFunctions.jsx";
import { ConnectWallet } from "./components/EthereumObject.jsx";

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadMessage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMessage = async () => {
    const newMessage = prompt("Enter new message");

    if (newMessage) {
      await setMessage(newMessage);
      loadMessage();
    }
  };

  const updateMessage = () => {
    < ConnectWallet/>

  }
  return (
    <div>
      <h1>Hello World, Jonas</h1>
    <p>Current Message: {message}</p>
    <button onClick={updateMessage}> Update message</button>
    </div>
  );
}

export default App;