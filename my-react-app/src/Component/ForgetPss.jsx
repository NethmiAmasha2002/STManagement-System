

// export default ForgotPassword;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// Make sure this path is correct
import forgotPasswordImage from '../images/Pss.png'; // Add a password recovery illustration

// Firebase imports
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database, auth } from '../firebase';
// import { firebaseApp } from '../firebase'; // Import your firebase configuration

// // Initialize Firebase services
// const auth = getAuth(firebaseApp);
// const database = getDatabase(firebaseApp);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email entry, 2: Success message
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Check if email exists in the users node
      const usersRef = ref(database, 'Users');
      const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      console.log("Snapshot value:", snapshot.val());
    
      if (!snapshot.exists()) {
        setError("Email is not registered. Please check your email address.");
        setLoading(false);
        return;
      }
      
      // If we're also checking for username match
      let usernameMatch = false;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.username === username) {
          usernameMatch = true;
        }
      });
      
      if (!usernameMatch) {
        setError("Username and email combination does not match our records.");
        setLoading(false);
        return;
      }

      // If email exists in users node, send password reset
      await sendPasswordResetEmail(auth, email);
      
      // Update UI to show success message
      setLoading(false);
      setStep(2);
    } catch (error) {
      setLoading(false);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        setError("No user found with this email address.");
      } else if (error.code === 'auth/invalid-email') {
        setError("The email address is not valid.");
      } else {
        setError("An error occurred. Please try again later.");
        console.error("Password reset error:", error);
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="app-container">
      {/* Header Section */}
    
      {/* Main Content */}
      <main className="auth-content">
        <div className="auth-container forgot-password-container">
          {/* Left Side - Form Section */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              {step === 1 ? (
                <>
                  <h3 className="auth-form-title">Forgot Password</h3>
                  <p className="auth-form-subtitle">Enter your details to reset your password</p>
                  <div className="auth-divider">
                    <span className="auth-divider-line"></span>
                  </div>
                  
                  {error && (
                    <div className="auth-error-message" style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-group">
                      <div className="auth-label-container">
                        <FaUser className="auth-label-icon" />
                        <label className="auth-form-label">Username</label>
                      </div>
                      <div className="auth-input-container">
                        <input
                          type="text"
                          className="auth-input"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="auth-form-group">
                      <div className="auth-label-container">
                        <FaEnvelope className="auth-label-icon" />
                        <label className="auth-form-label">Email</label>
                      </div>
                      <div className="auth-input-container">
                        <input
                          type="email"
                          className="auth-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your registered email"
                          required
                        />
                      </div>
                    </div>

                    <div className="auth-button-container">
                      <button
                        type="submit"
                        className={`auth-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Reset Password'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="reset-success">
                  <div className="success-icon">
                    <FaCheckCircle />
                  </div>
                  <h3 className="success-title">Check Your Email</h3>
                  <p className="success-message">
                    We've sent a password reset link to <strong>{email}</strong>. 
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                  <p className="success-note">
                    If you don't see the email, please check your spam folder.
                  </p>
                </div>
              )}
              
              <div className="auth-link-container back-link-container">
                <button onClick={handleBackToLogin} className="back-link">
                  <FaArrowLeft className="back-icon" /> Back to Login
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Welcome Section */}
          <div className="auth-welcome-section">
            <div className="auth-welcome-content">
              <h2 className="auth-welcome-title">Reset Password</h2>
              <h3 className="auth-system-title">Student Management System</h3>
              <div className="auth-image-container">
                <img src={forgotPasswordImage} alt="Forgot Password" className="auth-image" />
              </div>
              <div className="auth-welcome-steps">
                <div className="auth-step">
                  <div className="auth-step-number">1</div>
                  <div className="auth-step-text">Enter your username and email</div>
                </div>
                <div className="auth-step">
                  <div className="auth-step-number">2</div>
                  <div className="auth-step-text">Check your email for the reset link</div>
                </div>
                <div className="auth-step">
                  <div className="auth-step-number">3</div>
                  <div className="auth-step-text">Create a new secure password</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;