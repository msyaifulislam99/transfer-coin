import React, { useState } from 'react';
import Web3 from 'web3';
import MessageModal from './MessageModal';

interface TransferFormData {
  amount: string;
  receiverAddress: string;
}

interface IData {
  message: string;
  title: string;
  hash: string;
}

const TransferForm = () => {
  const [openModal, setOpenModal] = useState(false)
  const [process, setProcess] = useState(true) 
  const [formData, setFormData] = useState<TransferFormData>({
    amount: '',
    receiverAddress: '',
  });

  const [modalData, setModalData] = useState<IData>({
    message: '',
    title: '',
    hash: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProcess(!process)
    let web3;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Use MetaMask provider
      web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      alert('you dont have metamask, please install it first')
    }
    const accounts = await web3?.eth.getAccounts() || [];
    const sender = accounts[0];

    const transactionParameters = {
      from: sender,
      to: formData.receiverAddress,
      value: web3?.utils.toWei(formData.amount, 'ether')
    };

    try {
      const transactionHash = await web3?.eth.sendTransaction(transactionParameters);
      setModalData({
        message: 'your transaction is success',
        title: 'success',
        hash: transactionHash?.blockHash || '',
      })
      setOpenModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-4">Transfer ETH</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Amount (ETH):
            </label>
            <input
              type="number"
              id="amount"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.amount}
              onChange={(event) => setFormData({ ...formData, amount: event.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="toAddress"
            >
              To Address:
            </label>
            <input
              type="text"
              id="toAddress"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.receiverAddress}
              onChange={(event) => setFormData({ ...formData, receiverAddress: event.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!process}
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <MessageModal state={openModal} data={modalData} />
    </>
  );
};

export default TransferForm;
