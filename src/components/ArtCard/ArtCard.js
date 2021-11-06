import React from "react";
import "./ArtCard.css";
import image from '../../img/download.jpeg'
const ArtCard = (props) => {
  return (
    <div className="card-container">
      <div className="card" >
        <div className="imgBx">
          <img src={props.image} alt="" />
        </div>
        <div className="content">
          <p className="title">{props.title}</p>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
