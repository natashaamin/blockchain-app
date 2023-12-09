import React, { createContext, useEffect, useState } from "react";
import abi from "../utils/WavePortal.json";
import { ethers } from "ethers";

export const WaveContext = createContext();
const { ethereum } = window;
const contractAddress = process.env.REACT_APP_ADDRESS;
const contractABI = abi.abi;

console.log(contractAddress, "address");
console.log(contractABI, "contract");

const getEthereumContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return wavePortalContract;
};

export const WaveProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [noMetamask, setNoMetmask] = useState(false);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [waveCount, setWaveCount] = useState(localStorage.getItem("waveCount"));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      ethereum
        ? console.log("Make sure you have metamask")
        : console.log("We have the etheruem object", ethereum);

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        getAllWaves();
        console.log("Found an authorized account:", account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionIsExisted = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const waveContract = getEthereumContract();
        const currentWaveCount = await waveContract.getTotalWaves();
        window.localStorage.setItem("waveCount", currentWaveCount);
      }
    } catch (e) {
      console.log(e);

      throw new Error("No ethereum object");
    }
  };

  const connectWalletToMetamask = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        setNoMetmask(true)
        console.log("Get metamask");

        setInterval(() => {
          setNoMetmask(false)
        }, 5000);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onPressedWaveButton = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;

        const waveContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        console.log(typeof message);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const startEstimate = await waveContract.estimateGas.wave(
          addressTo,
          message,
          keyword,
          parsedAmount
        );
        const waveHash = await waveContract.wave(
          addressTo,
          message,
          keyword,
          parsedAmount,
          {
            gasLimit: startEstimate,
          }
        );

        setIsLoading(true);
        console.log(`Loading - ${waveHash.hash}`);
        await waveHash.wait();
        console.log(`Success - ${waveHash.hash}`);
        setIsLoading(false);

        const waveCount = await waveContract.getTotalWaves();
        console.log(`WaveCount - ${waveCount}`);
        setWaveCount(waveCount.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      console.log("here");
      if (ethereum) {
        const wavePortalContract = getEthereumContract();

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();

        const waveCleaned = waves.map((wave) => ({
          addressTo: wave.receiver,
          addressFrom: wave.sender,
          timestamp: new Date(
            wave.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: wave.message,
          keyword: wave.keyword,
          amount: parseInt(wave.amount._hex) / 10 ** 18,
        }));

        setAllWaves(waveCleaned);
      } else {
        console.log("Ehtereum object doesnt exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // document.body.classList.toggle("bg-black", darkMode);
    checkIfWalletIsConnected();
    checkIfTransactionIsExisted();

    // return () => {
    //   document.body.classList.remove("bg-black");
    // };
  }, [waveCount]);


  return (
    <WaveContext.Provider
      value={{
        connectWalletToMetamask,
        currentAccount,
        handleChange,
        isLoading,
        formData,
        onPressedWaveButton,
        allWaves,
        noMetamask
      }}
    >
      {children}
    </WaveContext.Provider>
  );
};
