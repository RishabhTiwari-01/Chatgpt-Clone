


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend API Call
      const res = await axios.post("https://chatgpt-clone-backend-7laf.onrender.com/api/auth/register", { 
        email, 
        password 
      });

      // Professional English Success Message
      alert("Registration successful! You can now log in.");
      navigate("/login"); 

    } catch (err) {
      // Professional English Error Handling
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create your account</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6"
            />
          </div>

          <button type="submit" style={styles.button}>Sign up</button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

// Styling for Professional Look
// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#343541' },
//   card: { background: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
//   title: { marginBottom: '24px', color: '#2d333a', fontSize: '32px', fontWeight: '700' },
//   form: { textAlign: 'left' },
//   inputGroup: { marginBottom: '20px' },
//   label: { display: 'block', marginBottom: '8px', fontSize: '14px', color: '#6e6e80', fontWeight: '500' },
//   input: { width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #c2c8d0', fontSize: '16px', boxSizing: 'border-box' },
//   button: { width: '100%', padding: '12px', background: '#10a37f', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: '600' },
//   errorBox: { color: '#d32f2f', backgroundColor: '#fdecea', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', border: '1px solid #facccc' },
//   footerText: { marginTop: '24px', fontSize: '14px', color: '#2d333a' },
//   link: { color: '#10a37f', textDecoration: 'none', fontWeight: '500' }
// };





const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', // Taaki lambe forms mein scroll ho sake
    background: 'radial-gradient(circle at top right, #1a1a1a, #000000)',
    fontFamily: "'Inter', sans-serif",
    padding: '20px'
  },
  card: { 
    background: 'rgba(255, 255, 255, 0.03)', 
    backdropFilter: 'blur(15px)', 
    padding: '40px', 
    borderRadius: '28px', 
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)', 
    width: '100%', 
    maxWidth: '450px', 
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-out' // Smooth entry ke liye
  },
  title: { 
    marginBottom: '8px', 
    color: '#ffffff', 
    fontSize: '32px', 
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    color: '#8e8ea0',
    fontSize: '15px',
    marginBottom: '32px'
  },
  // Social Buttons (Google/Microsoft jaisa look)
  socialButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '12px',
    border: '1px solid #3e3e42',
    background: 'transparent',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    color: '#565869',
    fontSize: '12px',
    margin: '24px 0',
    gap: '10px'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#3e3e42'
  },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '18px' },
  label: { 
    display: 'block', 
    marginBottom: '8px', 
    fontSize: '13px', 
    color: '#c5c5d2',
    fontWeight: '500'
  },
  input: { 
    width: '100%', 
    padding: '12px 16px', 
    borderRadius: '12px', 
    border: '1px solid #4d4d4f', 
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '15px', 
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  // Alag se password strength ya info ke liye
  helperText: {
    fontSize: '12px',
    color: '#8e8ea0',
    marginTop: '6px'
  },
  button: { 
    width: '100%', 
    padding: '14px', 
    background: '#10a37f', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    fontWeight: '700',
    marginTop: '10px',
    boxShadow: '0 10px 20px -10px rgba(16, 163, 127, 0.5)',
  },
  footerText: { 
    marginTop: '28px', 
    fontSize: '14px', 
    color: '#8e8ea0' 
  },
  link: { 
    color: '#10a37f', 
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer'
  }
};
export default Signup;