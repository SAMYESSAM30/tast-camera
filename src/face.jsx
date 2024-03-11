import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = ({ initialPhoto, photos }) => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const analyzePhotos = async () => {
      try {
        await loadModels();

        if (initialPhoto && photos && photos.length > 0) {
          const image = await faceapi.fetchImage(initialPhoto);
          const descriptors = await faceapi.computeFaceDescriptor(image);
          const faceMatcher = new faceapi.FaceMatcher(descriptors);

          for (const photo of photos) {
            const image = await faceapi.fetchImage(photo);
            const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            const match = faceMatcher.findBestMatch(detections.descriptor);

            if (match._distance < 0.6) {
              setResult('Same person detected!');
            } else {
              setResult('Different person detected!');
              break; // No need to continue checking if a different person is detected
            }
          }
        }
      } catch (error) {
        console.error('Error analyzing photos:', error.message);
        setResult('Error analyzing photos. Please try again.');
      }
    };

    analyzePhotos();
  }, [initialPhoto, photos]);

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]);
  };

  return (
    <div>
      <h2>Face Recognition</h2>
      <p>{result}</p>
    </div>
  );
};

export default FaceRecognition;
