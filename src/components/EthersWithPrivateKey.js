import { ethers } from "ethers";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const EthersWithPrivateKey = () => {
  console.log(`hello world`);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/0bb35d05064b42fb96254e5f7eb2c2b2"
  );

  const { address } = useAccount();

  let wallet = new ethers.Wallet(
    "6402bbf0dd9ba47e3f1f542a28f2b72c94f42c360da5ee0589a47a62c36a6037"
  );

  const fromAddress = address;
  const toAddress = "0xF964B6BCF4BA6881593D29CFb9fDB6Bb0175BEE5";

  const sendEth = async () => {
    const nonce = provider.getTransactionCount(fromAddress, "latest");

    const tx = {
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther("0.01"),
      gasPrice: provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(100_000), // 100 gwei
      nonce: nonce,
    };

    let walletSigner = wallet.connect(provider);

    try {
      const transaction = await walletSigner.sendTransaction(tx);
      console.log(transaction);
    } catch (error) {
      console.log("🚀 ~ sendEth ~ error:", error);
    }
  };

  return (
    <div>
      <ConnectButton />

      <p>
        <button onClick={sendEth}>Send 0.01 eth</button>
      </p>
    </div>
  );
};

export default EthersWithPrivateKey;
