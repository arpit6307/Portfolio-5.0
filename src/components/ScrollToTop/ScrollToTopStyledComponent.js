import styled from 'styled-components';

export const ScrollUpButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 0.9;
    visibility: visible;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    box-shadow: 0 0 20px ${({ theme }) => theme.primary + '80'};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    right: 20px;
    bottom: 20px;
  }
`;
