import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
  }
`;

export const ChatFab = styled.button`
  position: fixed;
  bottom: 40px;
  left: 40px; /* Right se left kiya gaya */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px; /* Right se left kiya gaya */
    width: 50px;
    height: 50px;
  }
`;

export const ChatWindow = styled.div`
  position: fixed;
  bottom: 120px;
  left: 40px; /* Right se left kiya gaya */
  width: 100%;
  max-width: 400px;
  height: 60vh;
  max-height: 500px;
  background: ${({ theme }) => theme.card + 'BF'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 998;
  transform-origin: bottom left; /* Right se left kiya gaya */
  animation: ${({ isOpen }) => isOpen ? css`${slideIn} 0.3s ease-out forwards` : css`${slideOut} 0.3s ease-in forwards`};

  @media (max-width: 768px) {
    bottom: 90px;
    left: 20px; /* Right se left kiya gaya */
    max-width: calc(100vw - 40px);
  }
`;

export const ChatHeader = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.primary + '30'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 1.5rem;
`;

export const MessageList = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const messageBubble = css`
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
`;

export const UserMessage = styled.div`
  ${messageBubble}
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  align-self: flex-end;
  border-bottom-right-radius: 4px;
`;

export const BotMessage = styled.div`
  ${messageBubble}
  background-color: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  align-self: flex-start;
  border-bottom-left-radius: 4px;
`;

export const InputArea = styled.form`
  display: flex;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.primary + '40'};
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.bgLight};
  border-radius: 20px;
  padding: 10px 15px;
  outline: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const SendButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const typingAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
`;

export const TypingIndicator = styled.div`
    align-self: flex-start;
    display: flex;
    gap: 4px;
    padding: 10px 15px;

    & > div {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.text_secondary};
        animation: ${typingAnimation} 1s infinite ease-in-out;
    }

    & > div:nth-child(2) {
        animation-delay: 0.2s;
    }

    & > div:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

