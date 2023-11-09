import React, { useState } from "react";
import './Converter.css';
import ProgressIndicator from "./ConverterComponents/ProgressIndicator";
import RequestXml from "./ConverterComponents/RequestXml";
import RequestSalesforceLog from "./ConverterComponents/RequestSalesforceLog";

const Converter = () => {
  const [layoutSections, setLayoutSections] = useState('');
  const [fileName, setFileName] = useState('');

  const steps = [
    { label: "Upload XML" },
    { label: "Field Info from SF" },
    { label: "LWC" }
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    switch(stepIndex) {
      case 0:
        setCurrentStep(0);
        break;
      case 1:
        fileName !== '' ? setCurrentStep(1) : console.log('err');
        break;
      case 2:
        setCurrentStep(2);
        break;
    }
    
  };



  const handleFileUpload = (layoutList, fileName) => {
    console.log('test');
    console.log('layoutList= ', layoutList);
    console.log('fileName= ', fileName);
    setFileName(fileName);
    setLayoutSections(layoutList);

  }

  const handleNavigate = (page) => {
    setCurrentStep(page);
  }


  return (
    <div>
      <div className="converter-container" >

      <div className="main-header">
        <h1>Converter. XML to Lightning Web Components(LWC)</h1>
      </div>

      <div className="progress-indicator-container">
        <ProgressIndicator currentStep={currentStep} steps={steps} onStepClick={handleStepClick} />
      </div>
 
      {currentStep === 0 ? <RequestXml onFileUpload={handleFileUpload} onSetPage={handleNavigate} /> : null}

      {currentStep === 1 ? <RequestSalesforceLog objectName={fileName} onSetPage={handleNavigate} /> : null}

      {currentStep === 2 ? <div>TODO RESULT </div> : null}


    </div>
  </div>
  );
};

export default Converter;
