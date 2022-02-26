import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Upload, XLg, CheckLg } from 'react-bootstrap-icons';
import axios from 'axios';
import HotDogLogo from './assets/hotdog.png';
import StackGrid from "react-stack-grid";

import pic1 from './assets/examples/pic1.jpg';
import pic2 from './assets/examples/pic2.jpg';
import pic3 from './assets/examples/pic3.jpg';
import pic4 from './assets/examples/pic4.jpg';
import pic5 from './assets/examples/pic5.jpg';
import pic6 from './assets/examples/pic6.jpg';
import pic7 from './assets/examples/pic7.jpg';
import pic8 from './assets/examples/pic8.jpg';
import pic9 from './assets/examples/pic9.jpg';
import pic10 from './assets/examples/pic10.jpg';
import pic11 from './assets/examples/pic11.jpg';
import pic12 from './assets/examples/pic12.jpg';

function App() {
  const [imageData, setImageData] = useState(null);
  const [uploadState, setUploadState] = useState(0);
  const [isHotdogBool, setIsHotdogBool] = useState(null);
  const inputFile = useRef(null);
  const imagePreview = useRef(null);

  useEffect(() => {
    console.log("useEffect");
    if(imageData && uploadState === 1){
      const formData = new FormData();
      formData.append("imageData", imageData);

      axios.post('/predict', {
        data: formData,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      setTimeout(() => {
        const response = Math.random() < 0.5;
        setIsHotdogBool(response);
        setUploadState(2);
      }, 1000);
      
    }
    else{
      console.log("null");
    }
    
  }, [imageData]);

  const uploadFile = (e) => {
    // Checks if 'Share' button is clicked rather than uploadContainer
    if(e.target.type === 'button') return;
    inputFile.current.click();
    console.log("uploadFile");
  }

  const uploadHandler = (e) => {
    // checkFileType() <-- need to double check with Sohn on what specific file types (.png, .jpeg)
    setUploadState(1);
    setImageData({
      data: e.target.files[0]
    });
    console.log("uploadHandler");
  }

  const shareHandler = () => {
    alert("shareUploader");
  }

  const renderUploadText = () => {
    if(uploadState === 0){
      return (
        <>
          <p>Upload photo(.jpeg, .png) to see if hotdog, or not hotdog!</p>
          <Upload className="upload-icon" />
        </>
      )
    }
    else if(uploadState === 1) {
      if(imageData && 'data' in imageData && !imageData['data']){
        imagePreview.current.style.backgroundImage = `none`;
        setUploadState(0);
        setImageData(null);
        setIsHotdogBool(null);
        return;
      }
      const imgSrc = URL.createObjectURL(imageData.data);
      imagePreview.current.style.backgroundImage = `url(${imgSrc})`;
      imagePreview.current.style.opacity = `0.75`;
      return (
        <>
          <Spinner animation="border" variant="primary" />
        </>
      )
    }
    else if(uploadState === 2) {
      imagePreview.current.style.opacity = `1.0`;
      if(isHotdogBool === true){
        return (
          <div className="hotdog-result-display" id="hotdog-true">
            <div className="vertical-layout">
              <h1>Hotdog!</h1>
              <img className="hotdog-img-bool" src={HotDogLogo}></img>
              <CheckLg className="check-cross-img"/>
              <Button 
                variant="primary"
                onClick={shareHandler}
              >
                Share
              </Button>
            </div>
          </div>
        )
      }
      else if(isHotdogBool === false){
        return (
          <div className="hotdog-result-display" id="hotdog-false">
            <div className="vertical-layout">
              <h1>Not Hotdog!</h1>
              <img className="hotdog-img-bool" src={HotDogLogo}></img>
              <XLg className="check-cross-img"/>
              <Button 
                variant="primary"
                onClick={shareHandler}
              >
                Share
              </Button>
            </div>
          </div>
        )
      }
      return (
        <p>ERROR</p>
      )
    }
  }


  return (
    <div className="app">
      <div className="container">

        <div className="first-container">
          <div className="first-wrapper">
            <div className="title-container">
              <img className="hotdog-img" src={ HotDogLogo } alt="hot dog" />
              <h1>Hotdog <br />Not Hotdog</h1>
            </div>
            <div 
              className="upload-container"
              ref={imagePreview}
              onClick={uploadFile}
            >
              <div style={{width: '100%'}}>
                {renderUploadText()}
                <input 
                  type='file' 
                  id='file' 
                  accept="image/gif, image/jpeg, image/png"
                  ref={inputFile} 
                  style={{display: 'none'}}
                  onChange={uploadHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="second-container">
          <h2>Community Uploads</h2>
          <StackGrid
            monitorImagesLoaded={true}
            columnWidth={220}
            gutterWidth={20}
            gutterHeight={20}
          >
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic1} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic2} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic3} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic4} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic5} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label"id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic6} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic7} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label"id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic8} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-true">
                <h1>Hotdog</h1>
              </div>
              <img src={pic9} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic10} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic11} />
            </div>
            <div className="stack-image-wrapper">
              <div className="stack-image-label" id="hotdog-false">
                <h1>Not Hotdog</h1>
              </div>
              <img src={pic12} />
            </div>
          </StackGrid>
        </div>

      </div>

    </div>
  );
}

export default App;
