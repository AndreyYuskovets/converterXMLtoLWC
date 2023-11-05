import React, { useState, useRef } from "react";
import './Converter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faExclamationTriangle, faFileCode } from '@fortawesome/free-solid-svg-icons';
import {doConvert } from '../http/convertAPI'

const getIconByFileType = (fileName) => {
  const fileExtension = fileName.split('.').pop().toLowerCase();
  
  if (fileExtension === 'xml') {
    return faFileCode;
  } else {
    return faFile;
  }
};

const Converter = () => {
  const [draggedFile, setDraggedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [convertedFileName, setConvertedFileName] = useState('');
  const [convertedFileBody, setConvertedFileBody] = useState('');
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
    if (file && file.name.endsWith('.xml')) {
      setDraggedFile(file);
      setErrorMessage('');
      readXMLFile(file);
    } else {
      setDraggedFile(null);
      setConvertedFileName('');
      setConvertedFileBody('');
      setErrorMessage('Please upload a file with the .xml extension');
    }
  };

  const readXMLFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const xmlText = event.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const jsonData = xmlToJson(xmlDoc);
      setConvertedFileName(file.name);
      setConvertedFileBody(JSON.stringify(jsonData, null, 2));
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    if (!draggedFile) {
      setErrorMessage('Please upload a .xml file before converting.');
    } else {
      readXMLFile(draggedFile);
      console.log('send to server');
      doConvert(convertedFileName, convertedFileBody).then(res => {
        console.log('Response from server:', res);
      })
      .catch(error => {
        console.log('Error from server:', error);
      });
    }
  };

  const xmlToJson = (xml) => {
    let obj = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes[j];
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes[i];
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

  return (
    <div className="converter-container">
      <h1 className="header">Converter. XML to Lightning Web Components(LWC)</h1>
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
        {errorMessage}
      </div>}
      <button className="custom-button" onClick={handleButtonClick}>
        Convert File
      </button>
      <input type="file" ref={fileInputRef} style={{display: "none"}} onChange={handleInputChange} />
    </div>
  );
};

export default Converter;
