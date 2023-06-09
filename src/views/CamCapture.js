import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';


const CamCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user');

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };
  const [flag, setFlag] = useState(false)
  const handleTakePhoto = () => {
    setFlag(true);
    setCapturedImage(null);
    setPreviewImage(null)
  }

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
    setFlag(false);
    setCapturedImage(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center',marginTop:'30px',gap:'50px' }}>
        <Button color='primary' variant="contained" onClick={handleTakePhoto}>Take Photo</Button>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Button color='primary' variant="contained" onClick={handleButtonClick}>Pic Image</Button>
        </div>
      </div>
      {flag ?
        <div style={{display: 'flex',flexDirection:'column',alignItems:'center'}}>
          {capturedImage ? <img src={capturedImage} alt="Captured" style={{marginTop:"50px"}}/>: 
          <>
          <Webcam
            audio={false}
            mirrored={facingMode === 'user'}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            allowInsecure
            style={{width:'400px',height:'400px'}}
          />
          <div style={{display:'flex',columnGap:'50px'}}> 
          <Button variant="outlined" onClick={captureImage}>Capture Image</Button>
          <Button  variant="outlined" onClick={switchCamera}>Switch Camera</Button>
          </div>
          </>
          }
          {/* {capturedImage && <img src={capturedImage} alt="Captured" style={{width:'400px',height:'400px'}}/>} */}
        </div> : ''}
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {previewImage && <img src={previewImage} alt="Preview" style={{ width: '400px', height: '300px',marginTop:"50px" }} />}
      </div>

    </div>
  );
};

export default CamCapture;