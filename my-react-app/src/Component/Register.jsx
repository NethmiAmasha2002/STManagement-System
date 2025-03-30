import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
 // Make sure this path is correct
import registerImage from '../images/Reg.jpeg'; // Use the red register button image from screenshot
import { auth, database } from '../firebase'; // Import Firebase auth and database
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, push } from 'firebase/database';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    staffId: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
    
//     // Navigate to login page after registration
//     navigate('/login');
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      await push(ref(database, 'Users/'), {
        fullName: formData.fullName,
        email: formData.email,
        staffId: formData.staffId,
        phone: formData.phone,
        username: formData.username
      });
      
      alert('Registration Successful!');
      navigate('/Dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      

      {/* Main Content */}
      <main className="auth-content">
        <div className="auth-container register-container">
          {/* Left Side - Register Form */}
          <div className="auth-form-section register-form-section">
            <div className="auth-form-container">
              <h3 className="auth-form-title">Create Account</h3>
              <p className="auth-form-subtitle">Join the Student Management System</p>
              <div className="auth-divider">
                <span className="auth-divider-line"></span>
              </div>
              
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-group">
                  <div className="auth-label-container">
                    <FaUser className="auth-label-icon" />
                    <label className="auth-form-label">Full Name</label>
                  </div>
                  <div className="auth-input-container">
                    <input
                      type="text"
                      name="fullName"
                      className="auth-input"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
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
                      name="email"
                      className="auth-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="auth-form-row">
                  <div className="auth-form-group half-width">
                    <div className="auth-label-container">
                      <FaIdCard className="auth-label-icon" />
                      <label className="auth-form-label">Staff ID</label>
                    </div>
                    <div className="auth-input-container">
                      <input
                        type="text"
                        name="staffId"
                        className="auth-input"
                        value={formData.staffId}
                        onChange={handleChange}
                        placeholder="Enter staff ID"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="auth-form-group half-width">
                    <div className="auth-label-container">
                      <FaPhone className="auth-label-icon" />
                      <label className="auth-form-label">Phone</label>
                    </div>
                    <div className="auth-input-container">
                      <input
                        type="tel"
                        name="phone"
                        className="auth-input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="auth-form-group">
                  <div className="auth-label-container">
                    <FaUser className="auth-label-icon" />
                    <label className="auth-form-label">Username</label>
                  </div>
                  <div className="auth-input-container">
                    <input
                      type="text"
                      name="username"
                      className="auth-input"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Create a username"
                      required
                    />
                  </div>
                </div>
                
                <div className="auth-form-row">
                  <div className="auth-form-group half-width">
                    <div className="auth-label-container">
                      <FaLock className="auth-label-icon" />
                      <label className="auth-form-label">Password</label>
                    </div>
                    <div className="auth-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="auth-input"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
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
                  
                  <div className="auth-form-group half-width">
                    <div className="auth-label-container">
                      <FaLock className="auth-label-icon" />
                      <label className="auth-form-label">Confirm</label>
                    </div>
                    <div className="auth-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="auth-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                      />
                      <div 
                        className="auth-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="auth-button-container">
                  <button
                    type="submit"
                    className="auth-button register-button"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Side - Join Us Section */}
          <div className="auth-welcome-section">
            <div className="auth-welcome-content">
              <h2 className="auth-welcome-title">Join Us</h2>
              <h3 className="auth-system-title">Create Your Account</h3>
              <div className="auth-image-container">
                <img src={registerImage} alt="Register illustration" className="auth-image" />
              </div>
              <div className="auth-welcome-benefits">
                <div className="auth-benefit">
                  <div className="auth-benefit-icon">✓</div>
                  <div className="auth-benefit-text">Access to student management tools</div>
                </div>
                <div className="auth-benefit">
                  <div className="auth-benefit-icon">✓</div>
                  <div className="auth-benefit-text">Secure student data storage</div>
                </div>
                <div className="auth-benefit">
                  <div className="auth-benefit-icon">✓</div>
                  <div className="auth-benefit-text">Efficient course management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { auth, database } from '../firebase'; // Import Firebase auth and database
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { ref, set } from 'firebase/database';
// import registerImage from '../images/Reg.jpeg';

// const Register = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     staffId: '',
//     phone: '',
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
    
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;
      
//       await set(ref(database, 'Users/' + user.uid), {
//         fullName: formData.fullName,
//         email: formData.email,
//         staffId: formData.staffId,
//         phone: formData.phone,
//         username: formData.username
//       });
      
//       alert('Registration Successful!');
//       navigate('/login');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="app-container">
//       <main className="auth-content">
//         <div className="auth-container register-container">
//           <div className="auth-form-section register-form-section">
//             <div className="auth-form-container">
//               <h3 className="auth-form-title">Create Account</h3>
//               <p className="auth-form-subtitle">Join the Student Management System</p>
//               <form onSubmit={handleSubmit} className="auth-form">
//                 <div className="auth-form-group">
//                   <label>Full Name</label>
//                   <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Email</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Staff ID</label>
//                   <input type="text" name="staffId" value={formData.staffId} onChange={handleChange} required />
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Phone</label>
//                   <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Username</label>
//                   <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Password</label>
//                   <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
//                   <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                 </div>
//                 <div className="auth-form-group">
//                   <label>Confirm Password</label>
//                   <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//                   <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                 </div>
//                 <button type="submit">Register</button>
//               </form>
//             </div>
//           </div>
//           <div className="auth-welcome-section">
//             <h2>Join Us</h2>
//             <img src={registerImage} alt="Register illustration" />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Register;
