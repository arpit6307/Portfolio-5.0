import styled, { keyframes, css } from 'styled-components';

// Removed 'fadeIn' as it was unused and caused a warning.
const flipHorizontal = keyframes`
  0% { transform: rotateY(0deg); opacity: 1; }
  50% { transform: rotateY(90deg); opacity: 0; }
  100% { transform: rotateY(0deg); opacity: 1; }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 120px 20px 80px 20px;
    background: ${({ theme }) => theme.bg};
`;

export const AuthWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 450px;
    height: 600px; /* Fixed height for consistent flipping */
    perspective: 1000px; /* For 3D flip effect */
`;

/* The container that flips */
export const CardContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 1s;
    ${({ isFlipped }) => isFlipped && css`
        transform: rotateY(180deg);
    `}
    ${({ isAnimating }) => isAnimating && css`
        animation: ${flipHorizontal} 1s ease-in-out;
    `}
`;

/* Styles for the front (Login) and back (Register) of the card */
export const AuthCard = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden; /* Hide the back side during flip */
    border-radius: 16px;
    padding: 40px;
    background: ${({ theme }) => theme.card + 'BF'};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid ${({ theme }) => theme.primary + '40'};
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    /* Unique Design: Inner Shadow / Overlay */
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        background: radial-gradient(circle at 70% 30%, ${({ theme }) => theme.primary + '20'} 0%, transparent 40%);
        opacity: 0.8;
        z-index: 0;
        pointer-events: none;
    }
`;

export const LoginCard = styled(AuthCard)`
    transform: rotateY(0deg);
`;

export const RegisterCard = styled(AuthCard)`
    transform: rotateY(180deg);
`;

export const AuthTitle = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    text-align: center;
    margin-bottom: 10px;
    z-index: 1;
`;

export const InputWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
`;

export const AuthInput = styled.input`
    width: 100%;
    padding: 15px 15px 15px 45px;
    background-color: ${({ theme }) => theme.bgLight};
    border: 1px solid ${({ theme, hasError }) => hasError ? 'red' : theme.text_secondary + '50'};
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    &:focus {
        border-color: ${({ theme }) => theme.primary};
    }
`;

export const Icon = styled.div`
    position: absolute;
    left: 15px;
    color: ${({ theme }) => theme.text_secondary};
    pointer-events: none;
    z-index: 2;
`;

export const ToggleButton = styled.button`
    position: absolute;
    right: 15px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.text_secondary};
    cursor: pointer;
    padding: 0;
    z-index: 2;
    transition: color 0.3s ease-in-out;
    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

export const AuthButton = styled.button`
    width: 100%;
    padding: 14px 16px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    color: ${({ theme }) => theme.white};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px hsla(271, 100%, 50%, 0.5);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

export const ErrorMessage = styled.p`
    color: #ff4d4f;
    font-size: 12px;
    margin-top: -10px;
    margin-left: 15px;
    z-index: 1;
`;

export const LinkText = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    z-index: 1;

    span {
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
        font-weight: 600;
        transition: opacity 0.2s ease-in-out;
        &:hover {
            opacity: 0.8;
        }
    }
`;