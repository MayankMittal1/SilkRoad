import React, { Component } from "react";
import { ReactDOM } from "react";
import { Form, Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./DetailsForm.css";
import image from "./../../../img/download.jpeg";
import RangeSlider from "react-bootstrap/FormRange";
import Attribute from "../../../components/Attributes/Attributes";

const DetailsForm = () => {
  return (
    <div className="box">
      <Form className="form">
        <div className="lines"></div>
        <div className="cont">
        <div className="img-box ">
          <div className="imgBx">
            <img className="images" src={image} alt="" />
          </div>
          <div class="content">
            <div>
              <h2>Preview</h2>
            </div>
          </div>
        </div>
        </div>
        

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="label">Title</Form.Label>
          <Form.Control
            className="input-field"
            type="text"
            placeholder="Max 50 characters"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="label">Description</Form.Label>
          <Form.Control className=" input-field" as="textarea" rows={3} />
        </Form.Group>
        <Attribute>
        </Attribute>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label className="label">Maximum Supply</Form.Label>
          <Form.Control
            className=" input-field"
            type="number"
            placeholder="Quantity"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label className="label">Royalties</Form.Label>
          <Form.Control
            className=" input-field"
            type="number"
            placeholder="Between 0 and 100"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label className="label">Creator's Split</Form.Label>
          <Form.Control
            className=" input-field"
            type="number"
            placeholder="%"
          />
        </Form.Group>

        <PopOut />
      </Form>
      <div className="lines"></div>
    </div>
  );
};

const popover = (
  <Popover id="popover-basic" className="pop-over">
    <Popover.Header className="pop-head" as="h3">
      Add new creator
    </Popover.Header>
    <Popover.Body>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Address"
        />
      </Form.Group>
    </Popover.Body>
  </Popover>
);

const PopOut = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <button
      className="add"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      +
    </button>
  </OverlayTrigger>
);

export default DetailsForm;
