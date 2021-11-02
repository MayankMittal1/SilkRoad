import React , {useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import './Navbar.css';

const Navbar = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
    
      <NavLink className="navbar-brand navbar-logo ml-auto" to="/" exact>
      
        SILKROAD
      </NavLink>
    
     
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div class="container-fluid">
      <div 
        className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                <i 
                className="fas ">
                </i>Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/explore" exact>
                <i 
                className="far ">
                </i>Explore
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/createnft" exact>
                <i 
                className="far">
                </i>Create
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sell" exact>
                <i 
                className="far ">
                </i>Sell
              </NavLink>
            </li>
            <li className="nav-item Connect">
              <NavLink className="nav-link" to="/sell" exact>
                <i 
                className="far">
                </i>Connect
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <Button text= "Connect"/> 
            </li> */}
        </ul>
      </div>
      </div>
  </nav>
  )
}
export default Navbar;