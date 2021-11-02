import React  from "react";
import './Explore.css';
import ArtCard from "../../components/ArtCard/ArtCard";
import Header from "../../components/Header/Header";
const Explore= () => {
    return (
      <div className="main-cont">
        <div className="Head">
          <Header heading="Explore"/>
        </div>
        <div className = "container"> 
              {/* <h1 className = "text-center" style={{paddingTop: "30%"}}>
                  Explore
              </h1> */}
              
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
              <ArtCard/>
        </div>
        <hr className="hr-line"/>
    </div>
    );
  }
  
  export default Explore;