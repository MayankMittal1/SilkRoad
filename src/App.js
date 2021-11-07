import React, { useMemo,useCallback } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  getPhantomWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateNFT from "./pages/CreateNFT/CreateNFT";
import Explore from "./pages/Explore/Explore";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [getSolletWallet(), getPhantomWallet()], [network]);
  const onError = useCallback((error) => {
    console.log(
      "error",
      error.message ? `${error.name}: ${error.message}` : error.name
    );
    console.log("err", error);
  }, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect onError={onError} wallets={wallets}>
        <WalletModalProvider>
        <Router>
          <Navbar />
          <main>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/explore" exact>
                <Explore />
              </Route>
              <Route path="/createnft" exact>
                <CreateNFT />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
