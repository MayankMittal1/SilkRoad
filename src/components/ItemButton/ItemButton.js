import React from "react";
import './ItemButton.css'

const ItemButton = (props) => {
    return(
        <button className="item-button" type={props.type} onclick={props.onClick}>
            {props.heading}
            <br/>
            <span className="sub-head">{props.subheading}</span>
        </button>
    )
}
export default ItemButton;