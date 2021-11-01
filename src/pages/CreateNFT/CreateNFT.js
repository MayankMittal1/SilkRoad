import React, { Component ,useState } from "react";
import Header from "../../components/Header/Header";
import ItemButton from "../../components/ItemButton/ItemButton";
import './CreateNFT.css';
import Progress from "./Progress";
import Stepper from "../../components/Stepper/Stepper";
import TextInput from "../../components/TextInput/TextInput";

// const CreateNFT = () => {
//     return (
//       <div className = "nft-container">
//         <Header heading="Create NFT"/>
//         <div className="pane-view">
//           <div className="progress-cont">
//             <Progress/>
//           </div>
//           <div className="options">
//             <ItemButton heading="Image" subheading="(.PNG,.JPG,.SVG)"/>
//             <ItemButton heading="Video" subheading="(.PNG,.JPG,.SVG)"/>
//             <ItemButton heading="Audio" subheading="(.PNG,.JPG,.SVG)"/>
//             </div>
//             </div>
//       </div>
//     );
//   }
  
//   export default CreateNFT;
  

export default function CreateNFT() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: {},
    profile: {},
    settings: {}
  });

  function goNextPage() {
    if (page === 5) return;
    setPage((page) => page + 1);
  }
  function goPrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }
  function mint() {
    console.log("mint");
  }
  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
  }

  function submit() {
    fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
  }

  return (
    <div className="nft-container">
         <Header heading="Create NFT"/>
      <div className="pbar">
        <progress className="pbar-item" max="5" value={page} />
      </div>

      {/* the content goes here */}
      <div>
        {page === 1 && <OnboardingOne data={data.user} update={updateData} />}
        {page === 2 && (
          <OnboardingTwo data={data.profile} update={updateData} />
        )}
        {page === 3 && (
          <OnboardingThree data={data.settings} update={updateData} />
        )}
        {page === 4 && <OnboardingFour />}
      </div>

      <div className="buttons">
     {page !== 1 && <button className="step-btn" onClick={goPrevPage}>Back</button>}
     {page !== 5 && <button className="step-btn"  onClick={goNextPage}>Next</button>}
       {page === 5 && (
         <button className="step-btn step-btn-mint" type="submit" onClick={mint}>
          Mint
         </button>
       )}</div>
    </div>
  );
}

function OnboardingOne({ data, update }) {
  const newData = {};

  return (
    <div className="pane-view">
      <div className="progress-cont">
      <h3 ><u>Step 1:</u> Choose Item </h3></div>
    <div className="options">
               <ItemButton heading="Image" subheading="(PNG,JPG,GIF) " type="submit" onClick={()=>this.handleClick("next")}/>
                <ItemButton heading="Video" subheading="(MP4, MOV)" type="submit" onClick={()=>this.handleClick("next")}/>
                <ItemButton heading="Audio" subheading="(MP3, WAV, FLAC)" type="submit" onclick={()=>this.handleClick("next")}/>
                <ItemButton heading="AR/3D" subheading="(GLB)" type="submit" onClick={()=>this.handleClick("next")}/>
                <ItemButton heading="HTML Asset" subheading="(HTML)" type="submit" onClick={()=>this.handleClick("next")}/>
      </div></div>
  );
}

function OnboardingTwo({ data, update }) {
  return (<div className="form-one">
    <TextInput type="text" label="Name"/>
  </div>);
}

function OnboardingThree({ data, update }) {
  return <div>i am page three</div>;
}

function OnboardingFour({ data, update }) {
  return <div>i am page four</div>;
}
// export default class CreateNFT extends Component{
  
  
//   constructor() {
//     super();
//     this.state = {
//       page: 1
      
//     };
//     // const [page, setPage] = useState(1);
//     // const [loading, setLoading] = useState(false);
//     // const [data, setData] = useState();
//   }


//   handleClick(clickType) {
//     const { page } = this.state;
//     let newStep = page;
//     clickType === "next" ? newStep++ : newStep--;

//     if (newStep > 0 && newStep <= 5) {
//       this.setState({
//         page: newStep
//       });
//     }
//   }
//   mint(){
//     console.log('minted');
//   }
// //  updateData(type, newData) {
// //     setData((data) => {
// //       return { ...data, [type]: newData };
// //     });
// //   }

//   // submit() {
//   //   setLoading(true);
//   //   fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
//   // }
//   render(){
//   const { page} = this.state;
//   return (
//     <>
//     <div className="nft-container">
//         <Header heading="Create NFT"/>
//             <div className="pane-view">
//             <div>
//                 <progress max="5" value={page} />
//               </div>
//             {/*   <div className="progress-cont">
//                   <div className="stepper-container-vertical">
//                         <Stepper
//                           direction="vertical"
//                           currentStepNumber={page - 1}
//                           steps={stepsArray}
//                           stepColor="#65dfc9"
//               />
//             // </div> */
//             //   </div>

              
//             <div>
//               {this.page === 1 && 
//               (<OnboardingOne />
//               )}
//               {this.page === 2 && (
//                 <OnboardingTwo  />
//               )}
//               {this.page === 3 && (
//                 <OnboardingThree />
//               )}
//               {this.page === 4 && (
//                 <OnboardingThree  />
//               )}
//               {this.page === 5 && <OnboardingFour />}
//             </div>

      
//     </div>
//     <div className="buttons">
//     {this.page !== 1 && <button className="step-btn" onClick={()=>this.handleClick()}>Back</button>}
//     {this.page !== 5 && <button className="step-btn"  onClick={()=>this.handleClick("next")}>Next</button>}
//       {this.page === 5 && (
//         <button className="step-btn" type="submit" onClick={this.mint}>
//          Mint
//         </button>
//       )}</div>
//     </div>
//     </>
//   );
// }}

// const stepsArray = [
//   "Category",
//   "Upload",
//   "Info",
//   "Royalties",
//   "Launch"
// ];
// function OnboardingOne() {
//   // const newData = {};

//   return (
//     <div >
//          <div className="options">
//                 <ItemButton heading="Image" subheading="(PNG,JPG,GIF) " type="submit" onClick={()=>this.handleClick("next")}/>
//                 <ItemButton heading="Video" subheading="(MP4, MOV)" type="submit" onClick={()=>this.handleClick("next")}/>
//                 <ItemButton heading="Audio" subheading="(MP3, WAV, FLAC)" type="submit" onclick={()=>this.handleClick("next")}/>
//                 <ItemButton heading="AR/3D" subheading="(GLB)" type="submit" onClick={()=>this.handleClick("next")}/>
//                 <ItemButton heading="HTML Asset" subheading="(HTML)" type="submit" onClick={()=>this.handleClick("next")}/>
//               </div>     
//     </div>
//   );
// }

// function OnboardingTwo() {
//   return <div style={'color:white'}>i am page two</div>;
// }

// function OnboardingThree() {
//   return <div>i am page three</div>;
// }

// function OnboardingFour() {
//   return <div>i am page four</div>;
// }
