import React from "react";
import "./ProgressIndicator.css";

const ProgressIndicator = ({ currentStep, steps, onStepClick }) => {
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index < currentStep ? "completed" : ""} ${
            index === currentStep ? "active" : ""
          }`}
          onClick={() => onStepClick(index)}
        >
          {step.label}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;