import React, { Component, useState } from "react";
import { ReactDOM } from "react";
import { Form, Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./DetailsForm.css";
import { PublicKey } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import html2canvas from "html2canvas";
import { InputGroup, FormControl } from "react-bootstrap";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Creator, extendBorsh } from "../../../utils/customNFT/metaplex/metadata";
import mintNFT from "../../../utils/customNFT/mintNFT";
import Tag from "../../../components/Tag/Tag"
import Attribute from "../../../components/Attributes/Attributes";
import Alert from 'react-bootstrap/Alert';
import { render } from "@testing-library/react";
import Lottie from "react-lottie";

import * as location from "../1055-world-locations.json";
import { isConstructorDeclaration } from "typescript";

var LoadCheck = 0;

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
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

export const DetailsForm = (props) => {
  const initialState = () => 0;
  const [valued, setValued] = useState(initialState);
  const connection = props.connection;
  const publickey = props.publicKey;
  const signTransaction = props.signTransaction;
  const [tags, setTags] = useState([]);
  const handlePhoto = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    var img = document.querySelector("#image-preview");
    img.src = URL.createObjectURL(file);
    img.addEventListener("load", () => {
      console.log("h", img.height);
      console.log("w", img.width);
    });
  };
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleFormSubmit = (e) => {
    if (!publickey) throw new WalletNotConnectedError();
    html2canvas(document.querySelector("#image-preview")).then(async function (
      canvas
    ) {
      var dataUrl = canvas.toDataURL("image/png", 1.0);
      var file = await dataURLtoFile(dataUrl, `abc.png`);
      create(file);
    });
  };

  const create = async (file) => {
    extendBorsh();
    const metadata = {
      animation_url: undefined,
      creators: [
        new Creator({
          address: new PublicKey(publickey),
          verified: true,
          share: 100,
        }),
      ],
      description: document.getElementById('description').value,
      external_url: "",
      image: file.name,
      name: document.getElementById('title').value,
      symbol: '',
      attributes: tags,
      sellerFeeBasisPoints: parseInt(document.getElementById('royalties').value) * 100,
      properties: {
        category: "image",
        files: [{ type: file.type, uri: file.name }],
      },
    };
    const wallet = {
      publicKey: publickey,
      signTransaction: signTransaction,
    };
    setValued((1));
    const { metadataAccount, mintKey, nftAddress } = await mintNFT(
      connection,
      wallet,
      [file],
      metadata
    );
    console.log(metadataAccount, mintKey, nftAddress);
    setValued((0));
    alert("Your NFT has been created. Go to the HomePage to see it.");
  }

  return (
    <>
      {valued ? (
        <>
          <div className="box">
            <Lottie options={defaultOptions1} height={400} width={400} />
          </div>
        </>
      ) : (
        <>
          <div className="box" style={{ display: "flex", flexDirection: "column" }}>
            <Form className="form">
              <div className="lines"></div>
              <div
                className="cont"
                style={{
                  display: "flex",
                  height: 500,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: "center",
                    }}
                    className="inner-container"
                  >
                    <div className="sub-header">Drag the file</div>
                    <div class="line"></div>
                    <div className="draggable-cont" style={{ display: "flex", alignItems: "center" }}>
                      <Form.Control
                        className="input-field"
                        type="file"
                        name="image"
                        id="image"
                        onChange={handlePhoto}
                        style={{ width: 300 }}
                      />

                      <img
                        className="file-preview-cont"
                        src=""
                        id="image-preview"
                      ></img>
                      <div className="file-browser-cont"></div>
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
                  name="title"
                  id="title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="label">Description</Form.Label>
                <Form.Control
                  className=" input-field"
                  as="textarea"
                  rows={3}
                  name="description"
                  id="description"
                />
              </Form.Group>
              <div className="main-container">
                Tags
                <div className='tags'>
                  {tags.map((val) => (
                    <Tag trait_type={val.trait_type} value={val.value}></Tag>
                  ))}
                </div>
                <div className="input-container">
                  <div className="input-inner">
                    <InputGroup size="sm" className="mb-3">
                      <FormControl placeholder="Attribute" aria-label="Attribute" className=" input-field" id="trait-input" />
                    </InputGroup>
                  </div>
                  <div className="input-inner">
                    <InputGroup size="sm" className="mb-3">
                      <FormControl placeholder="Value" aria-label="Attribute" className=" input-field" id="value-input" />
                    </InputGroup>
                  </div>
                </div>
                <div className="add-div">
                  <div className="add-btn" onClick={() => setTags([...tags, { "trait_type": document.getElementById("trait-input").value, "value": document.getElementById("value-input").value }])}>Add</div>
                </div>
              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label className="label">Royalties</Form.Label>
                <Form.Control
                  className=" input-field"
                  type="number"
                  placeholder="Between 0 and 100"
                  name="royalties"
                  id="royalties"
                />
              </Form.Group>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button variant="primary" type="button" onClick={handleFormSubmit} className="browser-btn">
                  Submit
                </button>
              </div>
            </Form>
            <div className="lines"></div>
          </div>
        </>
      )}</>);
};
export default DetailsForm;