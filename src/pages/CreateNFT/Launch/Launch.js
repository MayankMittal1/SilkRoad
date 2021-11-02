import React, { Component } from "react";
import { ReactDOM } from "react";
import { Form, Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./Launch.css";
import image from "./../../../img/download.jpeg";
import RangeSlider from "react-bootstrap/FormRange";

const Launch = (props) => {
  return (
    <div className="boxs">
        <div className="liness"></div>
        <div className="conta">
        <div className="imag-box ">
          <div className="imagBx">
            <img className="images" src={image} alt="" />
          </div>
          <div class="contents">
            <div>
              <h2>Preview</h2>
            </div>
          </div>
        </div>
        </div>
        <div className="conts">
            <div className="head-one">
                ROYALTY PERCENTAGE
            </div>
            <div className="res-one">
                {props.royalty}
            </div>
            <div className="head-one">
                PRICE IN SOL
            </div>
            <div className="res-one">
                {props.price} 
            </div>
            <div className="head-two"></div>
        </div>
        <div className="llines"></div>
        </div>
        

       
);
}
export default Launch;
