import React from 'react';
import '../App.css'; // Make sure this file exists for styles
import firstBackground from '../assets/backgroundvideo.jpg'; // Adjust the path based on your folder structure
import secondBackground from '../assets/planets.jpg'; // Adjust the path based on your folder structure
import video from '../assets/expo_FINAL.mp4';
const Educational = () => {
  return (
    <div>
      {/* First Background Section */}
      <div className="background-section" style={{ backgroundImage: `url(${firstBackground})` }}>
        <div className="video-section">
          <video controls>
             <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Second Background Section */}
      <div className="background-section" style={{ backgroundImage: `url(${secondBackground})` }}>
        {/* You can add content here if needed */}
      </div>
    </div>
  );
};

export default Educational;