import React, { useState, useEffect } from 'react';
import Camera from './CameraFeed';
import Exam from './exam';





const App = () => {
  return (
    <div>
      <Exam />
      <Camera />
    </div>
  );
};

export default App;
