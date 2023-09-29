import React, { useState } from 'react';
import './Styles/Profile.css';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './SignUp';



function Profile() {
  const [showLogin, setShowLogin] = useState(true);
  const handleToggleForm = () => {

      setShowLogin(!showLogin);
    
  };

  return (
    <div className="UserProfile-parent">
      <Navbar />
      <div className="UserProfile">
        {showLogin ? (
          <Login handleToggleForm={handleToggleForm} />
        ) : (
          <Signup onSignup={handleToggleForm} />
        )}
      </div>
    </div>
  );
}

export default Profile;
