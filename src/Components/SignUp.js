import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile ,signOut} from 'firebase/auth'; 
import { auth } from '../firebase'; 
import './Styles/signup.css'; 
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
      });
  
      const { uid, displayName } = user;
      await axios.post('http://localhost:5001/saveUserData', { uid, displayName });
  
      // Sign out the user after signing them up
      await signOut(auth);
  
      // Redirect to the login page
      onSignup(); 
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={onSignup}>Back to Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
