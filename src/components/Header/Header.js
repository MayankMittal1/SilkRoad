import React  from "react";
import './Header.css';
// import back from './../../img/back.png';
const Header =(props) => {
    return (
      <div className="header">
        <div className="headtext">
          {props.heading}
        </div>
        <hr/>
      </div>

    )
  }
  
  export default Header;