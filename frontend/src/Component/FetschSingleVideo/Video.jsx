import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const VideoPlayer = () => {
  const {currentVideo} = useSelector(state => state.video)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  return (
    <div className='w-full h-full bg-black' >
      <div>
        {/* <input type="text" value={videoUrl} onChange={handleInputChange} /> */}
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
      <video
        className='w-full h-full'
        src={`${currentVideo.video}`}
        controls
        autoPlay={isPlaying}
        onTimeUpdate={handleTimeUpdate}
      ></video>
    </div>
  );
};

export default VideoPlayer;
