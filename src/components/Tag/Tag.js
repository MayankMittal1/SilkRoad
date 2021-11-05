import React from 'react';
import "./Tag.css"

const Tag = (props) => {
    return(
        <div className="main">
            <div className="upper">
                {props.trait_type}
            </div>
            <div className="lower">
                {props.value}
            </div>
        </div>
    )
}
export default Tag;