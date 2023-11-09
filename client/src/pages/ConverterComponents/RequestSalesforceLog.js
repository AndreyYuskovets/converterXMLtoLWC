import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFile, faExclamationTriangle, faFileCode } from "@fortawesome/free-solid-svg-icons";
import "./RequestSalesforceLog.css";

const getIconByFileType = (fileName) => {
  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (fileExtension === 'log') {
    return faFileCode;
  } else {
    return faFile;
  }
};

const RequestSalesforceLog = ({ objectName, onSetPage }) => {
  const textAreaRef = useRef(null);
  const [copied, setCopied] = useState(false);
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
    if (file && file.name.endsWith('.log') ) {
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
      const logText = event.target.result;
      console.log('logText=', logText);
    };
    reader.readAsText(file);
  };

  const textAreaValue = "String objectName = '" + objectName + "';" +
  "SObjectType objectType = Schema.getGlobalDescribe().get(objectName);" +
  "Map<String, List<Map<String, Object>>> objectMap = new Map<String, List<Map<String, Object>>>();" +
  "objectMap.put(objectName, new List<Map<String, Object>>());" +
  "Map<String, SObjectField> fields = objectType.getDescribe().fields.getMap();" +
  "for (String fieldName : fields.keySet()) {" +
   "SObjectField field = fields.get(fieldName);" +
   "String fieldTypeString = field.getDescribe().getType().name();" +
   "Map<String, Object> fieldInfo = new Map<String, Object>();" +
   "fieldInfo.put('fieldName', fieldName);" +
   "fieldInfo.put('fieldType', fieldTypeString);" +
   "if (fieldTypeString == 'Picklist') {" +
   " List<Schema.PicklistEntry> picklistValues = field.getDescribe().getPicklistValues();" +
   " List<String> picklistValueList = new List<String>();" +
   " for (Schema.PicklistEntry picklistEntry : picklistValues) {" +
   "  picklistValueList.add(picklistEntry.getValue());" +
   " }" +
   " fieldInfo.put('picklistValue', picklistValueList);" +
   "}" +
   "objectMap.get(objectName).add(fieldInfo);" +
  "}" +
  // "String jsonString = JSON.serialize(objectMap);" +
  "String jsonString = '>Start%^' + JSON.serialize(objectMap) + '>End%^';" +
  "System.debug(jsonString);";










  const handleButtonCreateLwcClick =(e) => {
    onSetPage(2);
  }


  const handleButtonCopyClick = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
  <div className="main-container">
    <div className="content-container">
      <div className="request-container">
        <p>Execute this code in the Anonymous Window (Salesforce Developer Console)</p>
        <div className="textarea-container">
          <div className="header-text-area">
            <button className="copy-button" onClick={handleButtonCopyClick}>
              <FontAwesomeIcon icon={faCopy} />
              {copied ? "Copied" : "Copy All"}
            </button>
          </div>
          <textarea ref={textAreaRef} className="textarea" value={textAreaValue} readOnly />
        </div>
      </div>

      <div className="between-container">
      </div>

      <div className="response-container">
      <p>Upload Log file from Salesforce Developer Console</p>




      <div className={`drag-drop-container drag-drop-container-log ${draggedFile ? "drag-over" : ""}`}
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
          <p>Drag and drop Log file here or click to choose a file</p>
        )}
    </div>
    {errorMessage && <div className="error-message">
      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
      <p>{errorMessage}</p>
    </div>}
    <input type="file" ref={fileInputRef} style={{display: "none"}} onChange={handleInputChange} />

    </div>
  </div>





    <div>
      
    </div>


    <button className="custom-button" onClick={handleButtonCreateLwcClick}>
      Create Lightning Web Component
    </button>
  </div>
  );
}


export default RequestSalesforceLog;