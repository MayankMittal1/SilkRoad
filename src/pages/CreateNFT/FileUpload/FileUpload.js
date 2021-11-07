import React, {useState,useRef} from "react";
import './FileUpload.css';
export default class FileUpload extends React.Component{

    constructor(props){
        super(props);
        this.state={
            file:null
        };
    }
    onFileLoad(e){
        this.setState({
            file: URL.createObjectURL(e.currentTarget.files[0])
          })
        const file = e.currentTarget.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () =>{
            //console.log("Image Loaded: ", fileReader.result);
        }
        fileReader.onabort=()=>{
            alert("Reading Aborted");
        }
        fileReader.onerror=()=>{
            alert("Reading Error");
        }
        fileReader.readAsDataURL(file);
    }
    render(){
        return(
            <div style = {{display: "flex", flexDirection:"column"}} className="inner-container">
                <div className="sub-header">
                    Drag the file
                </div>
                <div class="line"></div>
                <div className="draggable-cont">
                    <input 
                    type="file" 
                    id="file-browser-input" 
                    name="file-browser-input"
                    ref={input => this.fileInput = input} 
                    onDragOver = {(e)=> {e.preventDefault(); e.stopPropagation();}}
                    onDrop = {this.onFileLoad.bind(this)}
                    onChange = {this.onFileLoad.bind(this)}/>
                    
                    
                    
                    <img className="file-preview-cont" src={this.state.file}>
                    </img>
                    
                    
                    
                    <div className="helper-text"> Drag and Drop File Here</div>
                    <div className="file-browser-cont">
                        <button className="browser-btn" onClick = {()=> this.fileInput.click()}>
                            Browse
                        </button>
                    </div>
                    <div class="line"></div>
                </div>
                <div className="btn-upload">
                <button className="browser-btn upload-btn" onClick = {()=>{
                    localStorage.setItem('image',this.state.file)
                    console.log(localStorage.getItem('image'))
                }}>
                           Upload
                        </button></div>
            </div>
        );
    }
}
