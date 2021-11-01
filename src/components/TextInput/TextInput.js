import React from "react";
import './TextInput.css'

const TextInput= (props) => {
    return(
        <div className="field">
        <input type={props.type}/>
        <label>{props.label}</label>
        </div>

    )
}
export default TextInput;