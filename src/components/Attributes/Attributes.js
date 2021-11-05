import React, { useState } from 'react';
import "./Attributes.css"
import Tag from '../Tag/Tag';
import { InputGroup, FormControl } from "react-bootstrap";
const Attribute = () => {
    const [tags,setTags]=useState([]);
    return(
        <div className="main-container">
            Tags
            <div className='tags'>
                {tags.map((val)=>(
                    <Tag trait_type={val.trait_type} value={val.value}></Tag>
                ))}
            </div>
            <div className="input-container">
                <div className="input-inner">
                    <InputGroup size="sm" className="mb-3">
                        <FormControl placeholder="Attribute" aria-label="Attribute" className=" input-field" id="trait-input"/>
                    </InputGroup>
                </div>
                <div className="input-inner">
                    <InputGroup size="sm" className="mb-3">
                        <FormControl placeholder="Value" aria-label="Attribute" className=" input-field" id="value-input"/>
                    </InputGroup>
                </div>
            </div>
            <div className="add-div">
                <div className="add-btn" onClick={() => setTags([...tags,{"trait_type":document.getElementById("trait-input").value,"value":document.getElementById("value-input").value}])}>Add</div>
            </div>
        </div>
    )

}
export default Attribute
