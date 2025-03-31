


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase auth
import loginImage from '../images/welcome.jpg'; // Ensure the path is correct

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      navigate('/Dashboard'); // Redirect to dashboard after login
    } catch (error) {
      setError("Invalid email or password.");
      alert('Invalid email or password.');
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Main Content */}
      <main className="auth-content">
        <div className="auth-container">
          {/* Left Side - Login Form */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <h3 className="auth-form-title">Sign In</h3>
              <div className="auth-divider">
                <span className="auth-divider-line"></span>
              </div>

              <form onSubmit={handleLogin} className="auth-form">
                {error && <p className="auth-error">{error}</p>}

                <div className="auth-form-group">
                  <div className="auth-label-container">
                    <FaUser className="auth-label-icon" />
                    <label className="auth-form-label">Email</label>
                  </div>
                  <div className="auth-input-container">
                    <input
                      type="email"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="auth-form-group">
                  <div className="auth-label-container">
                    <FaLock className="auth-label-icon" />
                    <label className="auth-form-label">Password</label>
                  </div>
                  <div className="auth-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <div 
                      className="auth-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                <div className="forgot-password">
                  <Link to="/ForgetPss" className="forgot-link">Forgot Password?</Link>
                </div>

                <div className="auth-button-container">
                  <button
                    type="submit"
                    className={`auth-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Welcome Section */}
          <div className="auth-welcome-section">
            <div className="auth-welcome-content">
              <h2 className="auth-welcome-title">Welcome</h2>
              <h3 className="auth-system-title">Student Management System</h3>
              <div className="auth-image-container">
                <img src={loginImage} alt="Login illustration" className="auth-image" />
              </div>
              <div className="auth-welcome-features">
                <div className="auth-feature">
                  <div className="auth-feature-icon">✓</div>
                  <div className="auth-feature-text">Manage Student Records</div>
                </div>
                <div className="auth-feature">
                  <div className="auth-feature-icon">✓</div>
                  <div className="auth-feature-text">Track Course Progress</div>
                </div>
                <div className="auth-feature">
                  <div className="auth-feature-icon">✓</div>
                  <div className="auth-feature-text">Schedule Classes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
