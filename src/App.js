import "./App.css";
import EthersWithPrivateKey from "./components/EthersWithPrivateKey";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  sepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import EthersWithoutPrivateKey from "./components/EthersWithoutPrivateKey";
// import Aave from "./components/Aave/Aave";

function App() {
  const { chains, provider } = configureChains(
    [polygon, goerli],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <EthersWithoutPrivateKey />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
