import "./Progress.css";
import Stepper from "./../../components/Stepper/Stepper";
import React, { Component } from "react";

export default class Progress extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1
    };
  }

  handleClick(clickType) {
    const { currentStep } = this.state;
    let newStep = currentStep;
    clickType === "next" ? newStep++ : newStep--;

    if (newStep > 0 && newStep <= 4) {
      this.setState({
        currentStep: newStep
      });
    }
  }

  render() {
    const { currentStep} = this.state;
    // const { width } = useWindowDimensions();
    // const {direction} = {width < 768 ? "horizontal" : "vertical"};
    return (
      <>
        <div className="stepper-container-vertical">
          <Stepper
            direction="vertical"
            currentStepNumber={currentStep- 1}
            steps={stepsArray}
            stepColor="#65dfc9"
          />
        </div>

        {/* <div className="stepper-container-horizontal">
          <Stepper
            direction="horizontal"
            currentStepNumber={currentStep - 1}
            steps={stepsArray}
            stepColor="purple"
          />
        </div> */}

        <div className="buttons-container">
          <button onClick={() => this.handleClick()}>Previous</button>
          <button onClick={() => this.handleClick("next")}>Next</button>
        </div>
      </>
    );
  }
}

const stepsArray = [
  "Category",
  "Upload",
  "Info",
  "Launch"
];