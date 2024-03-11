import React, { useState, useEffect, useRef } from 'react';
import FaceRecognition from './face';
import Photo from './photo_2023-11-12_11-01-44.jpg' 
const Camera = ({ isExamTimeOver }) => {
  const [pictures, setPictures] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
        });
    }
  }, []);

  useEffect(() => {
    const pictureInterval = setInterval(() => {
      if (!isExamTimeOver) {
        capturePicture();
      }
    }, 5000);

    return () => clearInterval(pictureInterval);
  }, [isExamTimeOver]);

  const capturePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const dataURL = canvasRef.current.toDataURL('image/png');
      setPictures(prevPictures => [...prevPictures, dataURL]);
    }
  };

  return (
    <div>
      <h2>Camera</h2>
      <video ref={videoRef} autoPlay style={{ width: '400px', height: 'auto' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        {pictures.map((picture, index) => (
          <img key={index} src={picture} alt={`Picture ${index}`} style={{ width: '200px', height: 'auto', marginRight: '10px' }} />
        ))}
      </div>
       {pictures[0] && pictures && (     
         <FaceRecognition photos={pictures} initialPhoto={Photo}/>
)}
    </div>
  );
};

export default Camera;
