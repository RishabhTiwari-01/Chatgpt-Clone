


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend Login API call
      const res = await axios.post("https://chatgpt-clone-backend-7laf.onrender.com/api/auth/login", { 
        email, 
        password 
      });

      // Token ko storage mein save karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      
      // Page refresh karke home pe bhejo taaki App.jsx token detect kar sake
      window.location.href = "/"; 

    } catch (err) {
      // Professional English Error Handling
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
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
            />
          </div>

          <button type="submit" style={styles.button}>Log in</button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

// Professional Styling (Matching with Signup)
// const styles = {
//   container: { 
//     display: 'flex', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     height: '100vh', 
//     backgroundColor: '#343541' 
//   },
//   card: { 
//     background: '#ffffff', 
//     padding: '40px', 
//     borderRadius: '8px', 
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
//     width: '100%', 
//     maxWidth: '400px', 
//     textAlign: 'center' 
//   },
//   title: { 
//     marginBottom: '24px', 
//     color: '#2d333a', 
//     fontSize: '32px', 
//     fontWeight: '700' 
//   },
//   form: { textAlign: 'left' },
//   inputGroup: { marginBottom: '20px' },
//   label: { 
//     display: 'block', 
//     marginBottom: '8px', 
//     fontSize: '14px', 
//     color: '#6e6e80',
//     fontWeight: '500'
//   },
//   input: { 
//     width: '100%', 
//     padding: '12px', 
//     borderRadius: '4px', 
//     border: '1px solid #c2c8d0', 
//     fontSize: '16px', 
//     boxSizing: 'border-box' 
//   },
//   button: { 
//     width: '100%', 
//     padding: '12px', 
//     background: '#10a37f', 
//     color: '#fff', 
//     border: 'none', 
//     borderRadius: '4px', 
//     fontSize: '16px', 
//     cursor: 'pointer', 
//     fontWeight: '600' 
//   },
//   errorBox: { 
//     color: '#d32f2f', 
//     backgroundColor: '#fdecea', 
//     padding: '10px', 
//     borderRadius: '4px', 
//     marginBottom: '20px', 
//     fontSize: '14px', 
//     border: '1px solid #facccc' 
//   },
//   footerText: { 
//     marginTop: '24px', 
//     fontSize: '14px', 
//     color: '#2d333a' 
//   },
//   link: { 
//     color: '#10a37f', 
//     textDecoration: 'none',
//     fontWeight: '500'
//   }
// };



const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    // Dark deep background with a subtle gradient
    background: 'radial-gradient(circle at center, #212121 0%, #000000 100%)',
    fontFamily: "'Inter', -apple-system, sans-serif"
  },
  card: { 
    background: 'rgba(255, 255, 255, 0.05)', // Glass effect
    backdropFilter: 'blur(10px)', // Blur for modern feel
    padding: '48px', 
    borderRadius: '24px', 
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
    width: '100%', 
    maxWidth: '420px', 
    textAlign: 'center' 
  },
  title: { 
    marginBottom: '32px', 
    color: '#ffffff', 
    fontSize: '36px', 
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '24px' },
  label: { 
    display: 'block', 
    marginBottom: '10px', 
    fontSize: '13px', 
    color: '#9ca3af', // Muted gray
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: { 
    width: '100%', 
    padding: '14px 16px', 
    borderRadius: '12px', 
    border: '1px solid #3e3e42', 
    background: '#1a1a1c',
    color: '#ffffff',
    fontSize: '16px', 
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',
    // Focus effect add karne ke liye (pseudo-class handle karna padega component mein)
  },
  button: { 
    width: '100%', 
    padding: '14px', 
    background: '#10a37f', // Signature ChatGPT green
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    fontWeight: '700',
    transition: 'transform 0.2s ease, background 0.3s ease',
    boxShadow: '0 4px 14px 0 rgba(16, 163, 127, 0.39)',
  },
  errorBox: { 
    color: '#ff6b6b', 
    backgroundColor: 'rgba(255, 107, 107, 0.1)', 
    padding: '12px 16px', 
    borderRadius: '10px', 
    marginBottom: '24px', 
    fontSize: '14px', 
    border: '1px solid rgba(255, 107, 107, 0.2)',
    textAlign: 'center'
  },
  footerText: { 
    marginTop: '32px', 
    fontSize: '14px', 
    color: '#9ca3af' 
  },
  link: { 
    color: '#10a37f', 
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '5px'
  }
};
export default Login;