import React, { useState, useEffect } from "react";
import "./Explore.css";
import ArtCard from "../../components/ArtCard/ArtCard";
import Header from "../../components/Header/Header";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { fetchall, fetch } from "../../utils/createSale";
const Explore = () => {
  const { connection } = useConnection();
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    fetchall().then((res)=>{
      console.log(res)
      setNfts(res);
    })
  },[]);
  return (
    <div className="main-cont">
      <div className="Head">
        <Header heading="Explore" />
      </div>
      <div className="container">
        {nfts.map((nft) => (
            <ArtCard
              key={nft.pubkey.toBase58()}
              pubkey={nft.pubkey.toBase58()}
              connection={connection}
              type="Buy"
            />
        ))}
      </div>
      <hr className="hr-line" />
    </div>
  );
};

export default Explore;
