import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './Styles/Login.css';
import axios from 'axios';

const Login = ({ handleToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [displayName, setDisplayName] = useState('');

  

  useEffect(() => {
    // Check if the displayName is stored in localStorage
    const storedDisplayName = localStorage.getItem('displayName');
  
    if (storedDisplayName) {
      setDisplayName(storedDisplayName);
    }
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  
    return () => {
      unsubscribe(); // Cleanup the subscription
    };
  }, []);


  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      localStorage.setItem('uid', user.uid);
      const response = await fetch(`https://vinyl-website-backend-2ead81fa61bc.herokuapp.com/getDisplayName?uid=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setDisplayName(data.displayName);
        localStorage.setItem('displayName', data.displayName);
      } else {
        setError('Failed to fetch displayName from the backend');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
  
      const response = await fetch(`https://vinyl-website-backend-2ead81fa61bc.herokuapp.com/checkUserData?uid=${user.uid}`);
      if (response.ok) {
        const userData = await response.json();
        const { uid, displayName } = userData;
  
        if (uid && displayName) {
          localStorage.setItem('uid', uid);
          localStorage.setItem('displayName', displayName);
        }
        setDisplayName(displayName);
      } else {
        const { uid, displayName } = user;
        await axios.post('https://vinyl-website-backend-2ead81fa61bc.herokuapp.com/saveUserData', { uid, displayName });
        setDisplayName(displayName);
        localStorage.setItem('uid', uid);
        localStorage.setItem('displayName', displayName);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  
  
  
  
  
  

  const onLogout = () => {
    signOut(auth); 
    setIsLoggedIn(false);

    setDisplayName(''); 
    localStorage.removeItem('uid'); 
    localStorage.removeItem('displayName');
  };

  return (
    <div className="loginParent">
      {isLoggedIn ? (
        <div>
          <p>Welcome, {displayName}</p>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>LOGIN</h3>
          <form>
            <div className="form-group">
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                id="email-address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="username@website.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <div className="login-submit">
            <button type="submit" className="login-button" onClick={onLogin}>LOGIN</button>
            <button className="login-button login-button-google" onClick={onGoogleLogin}>Login with Google</button>
            </div>
            
          </form>
          {error && <p className="error">{error}</p>}
          <p>
            Don't have an account?{' '}
            <span onClick={handleToggleForm} className="toggle-link">
              Sign Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
