import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./PopUp.css";
import { createSale } from "../../utils/createSale";


export default class PopUp extends React.Component {
    data;
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.state = {
        price: " ",
        showHide: false,
        title: this.props.title,
        connection:this.props.connection,
        publicKey:this.props.publicKey,
        sendTransaction:this.props.sendTransaction,
        nft_address:this.props.nft
      }
    }
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    // on form submit...
    handleFormSubmit(e) {
      console.log(this.state)
      e.preventDefault()
      this.setState({ showHide: !this.state.showHide });
      createSale(this.state.nft_address,this.state.publicKey,this.state.price,this.state.connection,this.state.sendTransaction).then((res)=>{
        alert("Successfully Created Sale!")
      })
    }

  

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }
  handlePay(){
    // this.setState({ showHide: !this.state.showHide });
  }
  render() {
    const sell = this.state.title==='Sell'?true:false;
    return (
      <div>
        <Button variant="outline-info" onClick={() => this.handleModalShowHide()} >
          {this.props.title}
        </Button>
        {sell? (
            <Modal  show={this.state.showHide} centered>
            <Modal.Header className="my-modal" closeButton onClick={() => this.handleModalShowHide()}>
              <Modal.Title>Create Sale</Modal.Title>
            </Modal.Header>
            <Modal.Body className="my-modal" >
  
              <Form.Label className="labels">Price </Form.Label>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  className=" input-field"
                  type="number"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  name="price"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer className="my-modal">
              <Button
                variant="outline-info"
                onClick={() => this.handleModalShowHide()}
              >
                Close
              </Button>
              <Button className="save-btn" variant="info"
                type="submit" onClick={this.handleFormSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        ):(
          <Modal  show={this.state.showHide} centered>
            <Modal.Header className="my-modal" closeButton onClick={() => this.handleModalShowHide()}>
              <Modal.Title>Purchase NFT</Modal.Title>
            </Modal.Header>
            <Modal.Body className="my-modal" >
              <p>Click 'Pay' to confirm purchase!</p>
            </Modal.Body>
            <Modal.Footer className="my-modal">
              <Button
                variant="outline-info"
                onClick={() => this.handleModalShowHide()}
              >
                Close
              </Button>
              <Button className="save-btn" variant="info"
                type="submit" onClick={this.handlePay()}
              >
                Pay
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        
      </div>
    );
  }
}

