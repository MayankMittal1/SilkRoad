import React, { useState, useEffect } from "react";
import "./ArtCard.css";
import { useConnection } from "@solana/wallet-adapter-react";
const { programs } = require("@metaplex/js");
const axios = require("axios").default;

const ArtCard = (props) => {
  const { connection } = useConnection();
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    programs.metadata.Metadata.load(
      connection,
      props.pubkey
    ).then((data)=>{
      axios.get(data.data.data.uri).then((response) => {
        setMetadata(response.data);
      });
    });
  });
  return (
    <div className="card-container">
      <div className="card">
        <div className="imgBx">
          <img src={metadata.image} alt="" />
        </div>
        <div className="content">
          <p className="title">{metadata.name}</p>
          <p>{metadata.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
