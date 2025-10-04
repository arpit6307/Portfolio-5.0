import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, AuthWrapper, CardContainer, LoginCard, RegisterCard, AuthTitle,
    InputWrapper, AuthInput, Icon, ToggleButton, AuthButton, ErrorMessage, LinkText
} from './AuthStyle';
import { useAuth } from '../../utils/Auth';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import Footer from '../Footer'; // Footer import kiya

// Simple Email Validation regex
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// ======================== AUTH FORMS ========================

const LoginForm = ({ onToggleForm }) => {
    const { login, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validate = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        if (!EMAIL_REGEX.test(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            valid = false;
        }
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validate()) return;

        try {
            setLoading(true);
            await login(email, password);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setError('');
        setEmailError('');
        if (!email || !EMAIL_REGEX.test(email)) {
             setEmailError('Please enter a valid email to reset password.');
             return;
        }
        try {
            await resetPassword(email);
            setError('Password reset email sent! Check your inbox.');
        } catch (err) {
            setError('Failed to send reset email. User might not exist.');
        }
    };

    return (
        <LoginCard onSubmit={handleSubmit} as="form">
            <AuthTitle>Login to Continue</AuthTitle>

            <InputWrapper>
                <Icon><MailIcon /></Icon>
                <AuthInput
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validate}
                    hasError={emailError}
                    required
                />
            </InputWrapper>
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

            <InputWrapper>
                <Icon><LockIcon /></Icon>
                <AuthInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validate}
                    hasError={passwordError}
                    required
                />
                <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </ToggleButton>
            </InputWrapper>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

            <LinkText style={{ textAlign: 'right' }}>
                <span onClick={handleReset}>Forgot Password?</span>
            </LinkText>

            {error && <ErrorMessage style={{ textAlign: 'center' }}>{error}</ErrorMessage>}

            <AuthButton type="submit" disabled={loading || emailError || passwordError}>
                {loading ? 'Logging In...' : 'Login'}
            </AuthButton>

            <LinkText>
                Don't have an account? <span onClick={onToggleForm}>Register here</span>
            </LinkText>
        </LoginCard>
    );
};

const RegisterForm = ({ onToggleForm }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const validate = () => {
        let valid = true;
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmError('');

        if (name.length < 3) {
            setNameError('Name must be at least 3 characters.');
            valid = false;
        }
        if (!EMAIL_REGEX.test(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            valid = false;
        }
        if (password !== confirmPassword) {
            setConfirmError('Passwords do not match.');
            valid = false;
        }
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validate()) return;

        try {
            setLoading(true);
            await register(email, password);
            // Optionally, update profile with name here if needed
        } catch (err) {
            setError(err.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Email already in use.' : 'Registration failed. Try again.');
            setLoading(false);
        }
    };

    return (
        <RegisterCard onSubmit={handleSubmit} as="form">
            <AuthTitle>Create Account</AuthTitle>

            <InputWrapper>
                <Icon><PersonIcon /></Icon>
                <AuthInput
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={validate}
                    hasError={nameError}
                    required
                />
            </InputWrapper>
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

            <InputWrapper>
                <Icon><MailIcon /></Icon>
                <AuthInput
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validate}
                    hasError={emailError}
                    required
                />
            </InputWrapper>
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

            <InputWrapper>
                <Icon><LockIcon /></Icon>
                <AuthInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validate}
                    hasError={passwordError}
                    required
                />
                <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </ToggleButton>
            </InputWrapper>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

            <InputWrapper>
                <Icon><LockIcon /></Icon>
                <AuthInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validate}
                    hasError={confirmError}
                    required
                />
            </InputWrapper>
            {confirmError && <ErrorMessage>{confirmError}</ErrorMessage>}

            {error && <ErrorMessage style={{ textAlign: 'center' }}>{error}</ErrorMessage>}

            <AuthButton type="submit" disabled={loading || nameError || emailError || passwordError || confirmError}>
                {loading ? 'Registering...' : 'Register'}
            </AuthButton>

            <LinkText>
                Already have an account? <span onClick={onToggleForm}>Login here</span>
            </LinkText>
        </RegisterCard>
    );
};


// ======================== MAIN AUTH PAGE ========================

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const toggleForm = () => {
        setIsAnimating(true);
        setIsFlipped(!isFlipped);
        
        // Wait for the animation to finish before changing the content
        setTimeout(() => {
            setIsLogin(!isLogin);
            setIsAnimating(false);
        }, 500); // Half of the transition time
    };

    return (
        <>
            <Container id="auth-page">
                <AuthWrapper>
                    <CardContainer isFlipped={isFlipped} isAnimating={isAnimating}>
                        {isLogin ? (
                            <LoginForm onToggleForm={toggleForm} />
                        ) : (
                            <RegisterForm onToggleForm={toggleForm} />
                        )}
                        {/* The registration form element is placed behind the login one */}
                        {!isLogin && <LoginForm onToggleForm={toggleForm} />}
                        {isLogin && <RegisterForm onToggleForm={toggleForm} />}
                    </CardContainer>
                </AuthWrapper>
            </Container>
            {/* Footer component yahaan add kiya gaya hai */}
            <Footer />
        </>
    );
};

export default AuthPage;
