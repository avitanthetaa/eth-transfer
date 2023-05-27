import React from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const EthersWithoutPrivateKey = () => {
  // const transferETH = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     await window.ethereum.enable();

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();

  //     try {
  //       const tx = await signer.sendTransaction({
  //         to: "0x843F7B9A2D4f729Aa2e14ca7aAd590c305453621",
  //         value: ethers.utils.parseEther("0.001"),
  //       });
  //       console.log("🚀 ~ transferETH ~ tx:", tx);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     console.error("Metamask not found");
  //   }
  // };

  const { address } = useAccount();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/QhLTXEh5WHhl2ueMxwq9OgnlE1MVNyto"
  );

  const walletAddress = address; // Replace with your actual wallet address

  const sendEth = async () => {
    const nonce = await provider.getTransactionCount(walletAddress, "latest");

    const tx = {
      from: walletAddress,
      to: "0x843F7B9A2D4f729Aa2e14ca7aAd590c305453621",
      value: ethers.utils.parseEther("0.01"),
      gasPrice: await provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(100_000), // 100 gwei
      nonce: nonce,
    };

    const wallet = new ethers.Wallet(walletAddress, provider);

    try {
      const transaction = await wallet.sendTransaction(tx);
      console.log(transaction);
    } catch (error) {
      console.log("🚀 ~ sendEth ~ error:", error);
    }
  };

  return (
    <div>
      <ConnectButton />
      <button onClick={sendEth}>Transfer 0.001 ETH</button>
    </div>
  );
};

export default EthersWithoutPrivateKey;
