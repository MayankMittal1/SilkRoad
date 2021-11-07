import React from "react";
import { useState, useCallback, useEffect } from "react";
import ArtCard from "../../components/ArtCard/ArtCard";
import Header from "../../components/Header/Header";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Button } from "react-bootstrap";
import CustomButton from "../../components/customButton/CustomButton";
// import CustomButton from '../../components/customButton/CustomButton'
import PopUp from "../../components/PopUp/SellPopUp";
const { programs } = require("@metaplex/js");
const axios = require("axios").default;

const Home = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNFTs] = useState([]);
  const setStates =()=>{
    console.log(localStorage.getItem('nfts'))
    setNFTs(localStorage.getItem('nfts'))
    console.log(nfts)
  }
  const fetchNFTs =async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    let fetchednfts = await programs.metadata.Metadata.findByOwnerV2(
      connection,
      publicKey.toBase58()
    );
    // let ntfdata=[]
    // for(let nft of fetchednfts){
    //   const Metadata = await programs.metadata.Metadata.load(
    //     connection,
    //     nft.pubkey.toBase58()
    //   );
    //   axios.get(Metadata.data.data.uri).then((response) => {
    //     ntfdata.push(response.data)
    //   });
    // }
    setNFTs(fetchednfts)////yeh set nhi ho rha

  };


  return (
    <div className="main-cont">
      <div className="Head" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Header heading="Your NFT's" />
        <Button className="button-72" onClick={fetchNFTs} style={{width: 150, margin: 50}}>Fetch</Button>
      </div>
      <div className="container">
        {nfts.map((nft) => (
          <ArtCard key={nft.pubkey.toBase58()} pubkey={nft.pubkey.toBase58()}/>
        ))}
      </div>
      <hr className="hr-line" />
    </div>
    
  );
};

export default Home;
