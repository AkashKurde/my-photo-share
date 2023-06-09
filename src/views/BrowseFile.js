import React, { useRef, useState } from 'react';

const BrowseFile = () => {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
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
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={handleButtonClick}>Pic Image</button>
        <div>
        {previewImage && <img src={previewImage} alt="Preview" style={{width:'300px',height:'300px'}}/>}
        </div>
      </div>
    );
  };

export default BrowseFile;