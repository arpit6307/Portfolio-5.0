import styled, { keyframes } from 'styled-components';

// Keyframe for subtle background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframe for aurora effect on the card
const aurora = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Keyframe for floating inputs
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;


// Main container for the entire page
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  padding-top: 20px; /* YAHAN BADLAV KIYA GAYA HAI: Gap kam karne ke liye 100px se 20px kiya gaya */
  padding-bottom: 20px;
  background: linear-gradient(-45deg, ${({ theme }) => theme.bg}, ${({ theme }) => theme.bg_light}, ${({ theme }) => theme.primary + '11'});
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  overflow: hidden;
`;

// The perspective container for the 3D flip effect
export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: auto;
  min-height: 580px;
  perspective: 1500px;
`;

// Base styles for both login and register cards
const CardBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.9s cubic-bezier(0.4, 0.0, 0.2, 1);
  border-radius: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.card_light + 'BF'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Important for the aurora effect */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(125deg, ${({ theme }) => theme.primary + '40'}, ${({ theme }) => theme.bg_light + '40'}, #ff00ff40);
    background-size: 200% 200%;
    animation: ${aurora} 10s ease infinite;
    z-index: -1;
    opacity: 0.3;
  }
`;


export const LoginCard = styled(CardBase)`
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

export const RegisterCard = styled(CardBase)`
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)')};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
  text-align: center;
`;

export const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 30px;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  animation: ${float} 4s ease-in-out infinite;
  
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

export const Icon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text_secondary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + '40'};
  }
`;

export const PasswordToggle = styled.span`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text_secondary};
    cursor: pointer;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.primary + '50'};
  }

  &:disabled {
    background: ${({ theme }) => theme.text_secondary + '80'};
    cursor: not-allowed;
  }
`;

export const ForgotPassword = styled.div`
  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-top: -10px;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ToggleButton = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

export const LinkText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Error = styled.div`
    width: 100%;
    padding: 12px;
    background-color: #ff4d4d33;
    color: #ff4d4d;
    border: 1px solid #ff4d4d;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
`;

export const Message = styled.div`
    width: 100%;
    padding: 12px;
    background-color: #4dff8833;
    color: #4dff88;
    border: 1px solid #4dff88;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
`;

// Styles for Password Strength Indicator
export const PasswordStrengthIndicator = styled.div`
  width: 100%;
  margin-top: -5px; 
  margin-bottom: 10px;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: 0.6s; 
`;

export const StrengthText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
  text-align: left;
`;

export const StrengthBar = styled.div`
  height: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ score }) => (score / 5) * 100}%;
    background-color: ${({ score }) => {
      if (score > 4) return '#28a745'; 
      if (score > 2) return '#ffc107'; 
      return '#dc3545'; 
    }};
    border-radius: 10px;
    transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
  }
`;

