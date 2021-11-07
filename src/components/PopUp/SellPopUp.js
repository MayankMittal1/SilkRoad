import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./PopUp.css";


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
      }
    }
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    // on form submit...
    handleFormSubmit(e) {
      e.preventDefault()
      localStorage.setItem('nftprice', JSON.stringify(this.state));
      this.setState({ showHide: !this.state.showHide });
    }
  
    // React Life Cycle
    componentDidMount() {
      this.documentData = JSON.parse(localStorage.getItem('nftprice'));
  
      if (localStorage.getItem('nftprice')) {
        this.setState({
          price: this.documentData.price,
        })
      } else {
        this.setState({
          price: '',
        })
      }
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

