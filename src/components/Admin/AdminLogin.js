import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

const LoginCard = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.red};
    margin-top: 15px;
    font-size: 14px;
`;


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Agar user pehle se logged in hai, to use dashboard par bhej do.
    if (currentUser) {
      navigate('/admin/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!auth) {
        console.error("Firebase auth object is not available. Check your firebase.js file.");
        setError("Firebase configuration error. Please contact support.");
        return;
    }
    setLoading(true);
    setError('');
    
    try {
      // Firebase se login karne ki koshish karein
      await signInWithEmailAndPassword(auth, email, password);
      // Login safal hone par, AuthProvider (Auth.js) apne aap currentUser ko update kar dega,
      // aur upar wala useEffect hook user ko dashboard par navigate kar dega.
    } catch (err) {
      // Agar koi error aaye, to use screen par dikhayein
      console.error("Login attempt failed:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
          setError('Galat email ya password.');
      } else {
          setError('Login fail ho gaya. Kripya dobara koshish karein.');
      }
    } finally {
        // Chahe login safal ho ya asaphal, loading state ko false karein
        setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Admin Login</Title>
        <Form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;

