import React  from "react";
import './Button.css';

const Button = (props) => {
    return (
        <div class="wrapper">
            <button>
                {props.text}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
  }
  
  export default Button;