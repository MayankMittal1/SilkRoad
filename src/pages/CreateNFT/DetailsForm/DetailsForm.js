import React, { Component } from "react";
import { ReactDOM } from "react";
import { Form, Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./DetailsForm.css";
import image from "./../../../img/download.jpeg";
import RangeSlider from "react-bootstrap/FormRange";
import Attribute from "../../../components/Attributes/Attributes";
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

export default class DetailsForm extends Component {
  documentData;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      title: '',
      description: '',
      maxSupply: '',
      royalties: '',
      creatorSplit: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  // on form submit...
  handleFormSubmit(e) {
    e.preventDefault()
    localStorage.setItem('document', JSON.stringify(this.state));
  }

  // React Life Cycle
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('document'));

    if (localStorage.getItem('document')) {
      this.setState({
        title: this.documentData.title,
        description: this.documentData.description,
        maxSupply: this.documentData.maxSupply,
        royalties: this.documentData.royalties,
        creatorSplit: this.documentData.creatorSplit
      })
    } else {
      this.setState({
        title: '',
        description: '',
        maxSupply: '',
        royalties: '',
        creatorSplit: ''
      })
    }
  }

  render() {
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
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="label">Description</Form.Label>
            <Form.Control className=" input-field" as="textarea" rows={3} name="description" value={this.state.description} onChange={this.handleChange} />
          </Form.Group>
          <Attribute>
           </Attribute>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label className="label">Maximum Supply</Form.Label>
            <Form.Control
              className=" input-field"
              type="number"
              placeholder="Quantity"
              value={this.state.maxSupply}
              onChange={this.handleChange}
              name="maxSupply"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label className="label">Royalties</Form.Label>
            <Form.Control
              className=" input-field"
              type="number"
              placeholder="Between 0 and 100"
              value={this.state.royalties}
              onChange={this.handleChange}
              name="royalties"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label className="label">Creator's Split</Form.Label>
            <Form.Control
              className= "input-field"
              type="number"
              placeholder="%"
              value={this.state.creatorSplit}
              onChange={this.handleChange}
              name="creatorSplit"
            />
          </Form.Group>

          <PopOut />
          <Button variant="primary" type="submit" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
        <div className="lines"></div>
      </div>
    );
  };
}