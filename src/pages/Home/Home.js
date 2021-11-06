import React from "react";
import { useState, useCallback, useEffect } from "react";
import ArtCard from "../../components/ArtCard/ArtCard";
import Header from "../../components/Header/Header";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Button } from "react-bootstrap";
const { programs } = require("@metaplex/js");
const axios = require("axios").default;
// import TextInput from './../../components/TextInput/TextInput'
// import DetailsForm from './../../pages/CreateNFT/DetailsForm/DetailsForm'
// import Button from '../../components/button/Button';
// import FileUpload from "../CreateNFT/FileUpload/FileUpload";
// import Progress from "../CreateNFT/Progress";

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
    let ntfdata=[]
    for(let nft of fetchednfts){
      const Metadata = await programs.metadata.Metadata.load(
        connection,
        nft.pubkey.toBase58()
      );
      axios.get(Metadata.data.data.uri).then((response) => {
        ntfdata.push(response.data)
      });
    }
    setNFTs(ntfdata)////yeh set nhi ho rha
  };
  return (
    <div className="main-cont">
      <div className="Head">
        <Header heading="Your NFT's" />
        <Button onClick={fetchNFTs}>Fetch</Button>
      </div>
      <div className="container">
        {nfts.map((nft) => (
          <ArtCard title={nft.name}/>
        ))}
      </div>
      <hr className="hr-line" />
    </div>
  );
};

export default Home;
