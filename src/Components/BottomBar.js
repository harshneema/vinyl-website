import React from 'react';
import './Styles/BottomBar.css';

function BottomBar() {
  return (
    <div className="bottom-bar-container">
      <div className="bottom-bar-box">
        <button className="box-button">Contact</button>
        <button className="box-button">Terms of Service</button>
        <button className="box-button">Privacy Policy</button>
      </div>
      <div className="bottom-bar-box">
        <button className="box-button">Twitter</button>
        <button className="box-button">Instagram</button>
        <button className="box-button">Facebook</button>
        <button className="box-button">Youtube</button>
      </div>
      <div className="bottom-bar-box">
        <p className="copyright-text">@2022. VINYL</p>
      </div>
    </div>
  );
}

export default BottomBar;
