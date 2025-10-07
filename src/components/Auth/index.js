import React, { useEffect, useState } from 'react';
import {
    Container, Wrapper, Title, Desc, Form, Input, Button, Error,
    ToggleButton, LinkText, ForgotPassword, CardContainer, LoginCard,
    RegisterCard, InputWrapper, Icon, PasswordToggle, Message
} from './AuthStyle';
import { useAuth } from '../../utils/Auth';
import Footer from '../Footer'; // Import Footer
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const { 
        signup, 
        login, 
        sendPasswordResetEmail, 
        error, 
        setError 
    } = useAuth() || {};
    const navigate = useNavigate();
    
    const [view, setView] = useState('login'); // 'login', 'register'
    const [isForgotView, setIsForgotView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (setError) setError(null);
    }, [setError]);
    
    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        if (setError) setError(null);
        setMessage('');
    }, [view, isForgotView, setError]);

    const handleFlip = (targetView) => {
        if (isForgotView) setIsForgotView(false);
        setView(targetView);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setError) setError(null);
        setMessage('');
        setIsLoading(true);

        try {
            if (isForgotView) {
                if (typeof sendPasswordResetEmail !== 'function') throw new Error("Feature not available.");
                await sendPasswordResetEmail(email);
                setMessage("Password reset email sent! Please check your inbox.");
            } else if (view === 'login') {
                if (typeof login !== 'function') throw new Error("Login feature not available.");
                await login(email, password);
                navigate('/');
            } else if (view === 'register') {
                if (password !== confirmPassword) throw new Error("Passwords do not match!");
                if (typeof signup !== 'function') throw new Error("Signup feature not available.");
                await signup(email, password);
                navigate('/');
            }
        } catch (err) {
            if (setError && err.message) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const renderLoginContent = () => {
        if (isForgotView) {
            return (
                <Wrapper>
                    <Title>Reset Password</Title>
                    <Desc>Enter your email to receive a password reset link.</Desc>
                    <Form onSubmit={handleSubmit}>
                        <InputWrapper>
                            <Icon><FaEnvelope /></Icon>
                            <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                        </InputWrapper>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Reset Link'}</Button>
                    </Form>
                    <ToggleButton>
                        <LinkText onClick={() => setIsForgotView(false)}>Back to Login</LinkText>
                    </ToggleButton>
                </Wrapper>
            );
        }
        return (
            <Wrapper>
                <Title>Welcome Back!</Title>
                <Desc>Please log in to continue.</Desc>
                <Form onSubmit={handleSubmit}>
                    <InputWrapper>
                        <Icon><FaEnvelope /></Icon>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaLock /></Icon>
                        <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
                        <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </PasswordToggle>
                    </InputWrapper>
                    <ForgotPassword onClick={() => setIsForgotView(true)}>Forgot Password?</ForgotPassword>
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
                </Form>
                <ToggleButton>
                    Don't have an account? <LinkText onClick={() => handleFlip('register')}>Sign Up</LinkText>
                </ToggleButton>
            </Wrapper>
        );
    };

    const renderRegisterContent = () => (
        <Wrapper>
            <Title>Create Account</Title>
            <Desc>Join us! It's free and only takes a minute.</Desc>
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Icon><FaUser /></Icon>
                    <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading}/>
                </InputWrapper>
                <InputWrapper>
                    <Icon><FaEnvelope /></Icon>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                </InputWrapper>
                <InputWrapper>
                    <Icon><FaLock /></Icon>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
                    <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggle>
                </InputWrapper>
                <InputWrapper>
                    <Icon><FaLock /></Icon>
                    <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading}/>
                    <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggle>
                </InputWrapper>
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Sign Up'}</Button>
            </Form>
            <ToggleButton>
                Already have an account? <LinkText onClick={() => handleFlip('login')}>Login</LinkText>
            </ToggleButton>
        </Wrapper>
    );

    const isFlipped = view === 'register';

    return (
        <>
            <Container>
                <Wrapper>
                    <CardContainer>
                        <LoginCard isFlipped={isFlipped}>
                            {renderLoginContent()}
                        </LoginCard>
                        <RegisterCard isFlipped={isFlipped}>
                            {renderRegisterContent()}
                        </RegisterCard>
                    </CardContainer>
                    {error && <Error>{error}</Error>}
                    {message && <Message>{message}</Message>}
                </Wrapper>
            </Container>
            <Footer />
        </>
    );
};

export default AuthPage;

