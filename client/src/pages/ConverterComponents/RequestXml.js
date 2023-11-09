import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faExclamationTriangle, faFileCode } from '@fortawesome/free-solid-svg-icons';
import {parseString} from "xml2js";
import "./RequestXml.css";

const getIconByFileType = (fileName) => {
  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (fileExtension === 'xml' || fileExtension === 'layout') {
    return faFileCode;
  } else {
    return faFile;
  }
};

const RequestXml = ({ onFileUpload, onSetPage }) => {

  const [draggedFile, setDraggedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    if (file && (file.name.endsWith('.xml') || file.name.endsWith('.layout'))) {
      setDraggedFile(file);
      setErrorMessage('');
      readXMLFile(file);
    } else {
      setDraggedFile(null);
      setErrorMessage('Please upload a file with the .xml extension');
    }
  };



  const readXMLFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let xmlText = event.target.result;
      parseString(xmlText, (parseErr, result) => {
        if (parseErr) {
            console.error('Error parsing XML:', parseErr);
            return;
        }
        onFileUpload(result.Layout.layoutSections, file.name.slice(0, file.name.indexOf('-')));

    });
    };
    reader.readAsText(file);
  };

  const handleNextClick = () => {
    if (!draggedFile) {
      setErrorMessage('Please upload a .xml file before converting.');
    } else {
      onSetPage(1);
    }
  };


  return (
    <div className="main-container">
    <div className={`drag-drop-container ${draggedFile ? "drag-over" : ""}`}
           onDrop={handleDrop}
           onDragOver={(e) => e.preventDefault()}
           onClick={() => fileInputRef.current.click()}>
        {draggedFile ? (
          <div className="file-info">
            <FontAwesomeIcon icon={getIconByFileType(draggedFile.name)} className="file-icon" />
            <div className="file-details">
              <p>{draggedFile.name}</p>
            </div>
          </div>
        ) : (
          <p>Drag and drop your .xml file here or click to choose a file</p>
        )}
    </div>
    {errorMessage && <div className="error-message">
      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
      <p>{errorMessage}</p>
    </div>}
    <button className="custom-button" onClick={handleNextClick}>
      Next
    </button>
    <input type="file" ref={fileInputRef} style={{display: "none"}} onChange={handleInputChange} />
    </div>
  );
};

export default RequestXml;