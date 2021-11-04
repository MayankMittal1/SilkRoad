import React from "react";
import "./ArtCard.css";
import image from '../../img/download.jpeg'
const ArtCard = () => {
  return (
    <div className="card-container">
      <div className="card" >
        <div className="imgBx">
          <img src={image} alt="" />
        </div>
        <div className="content">
          <p className="title">NFT CARD</p>
          <p>Lorem ipsum dolor sit amet,orem ipsum dolor sit amet, consectetur adipiscing elit,orem ipsum dolor sit amet, </p>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
