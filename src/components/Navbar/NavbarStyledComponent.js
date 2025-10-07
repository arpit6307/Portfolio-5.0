import { Link as LinkR } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
// import { FaTimes } from 'react-icons/fa'; // Removed this import

export const Nav = styled.nav`
    background-color: transparent;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    padding: 10px 0;
    transition: all 0.3s ease-in-out;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 90%;
  padding: 0 24px;
  max-width: 1200px;
  
  background: ${({ theme }) => theme.card_light + '80'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 50px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  border: 1px solid ${({ theme }) => theme.primary + '40'};

  @media screen and (max-width: 960px) {
    width: 95%;
  }
`;

export const NavLogo = styled(LinkR)`
    width: 80%;    
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
      padding: 0 0px;
  }
`;
export const Span = styled.div`
    padding: 0 4px;
    font-weight: bold;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
`;
export const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 32px;
    padding: 0 6px;
    list-style: none;

    @media screen and (max-width: 960px) {
      display: none;
    }
`;

export const NavLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
    &.active {
      color: ${({ theme }) => theme.primary};
      border-bottom: 2px solid ${({ theme }) => theme.primary};
    }
`;


export const GitHubButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
    :hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};     
      transform: scale(1.05);
    }
    @media screen and (max-width: 768px) { 
    font-size: 14px;
    }
`;

export const ButtonContainer = styled.div`
  width: 80%;  
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  gap: 12px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
    z-index: 101;
  }
`;

const linkFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const auroraAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -40%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 98;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;


export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 280px;
    height: 100vh;
    padding: 2rem;
    background: ${({ theme }) => theme.card_light + 'BF'};
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    z-index: 99;
    box-shadow: -10px 0 30px rgba(0,0,0,0.25);
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 30%;
      left: 30%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, ${({ theme }) => theme.primary + '4D'} 0%, transparent 70%);
      border-radius: 50%;
      animation: ${auroraAnimation} 12s linear infinite;
      z-index: -1;
    }

    ${({ isOpen }) =>
      isOpen &&
      css`
        & > a {
          opacity: 0;
          animation: ${linkFadeIn} 0.5s ease-out forwards;
        }
        & > a:nth-child(1) { animation-delay: 0.1s; }
        & > a:nth-child(2) { animation-delay: 0.15s; }
        & > a:nth-child(3) { animation-delay: 0.2s; }
        & > a:nth-child(4) { animation-delay: 0.25s; }
        & > a:nth-child(5) { animation-delay: 0.3s; }
        & > a:nth-child(6) { animation-delay: 0.35s; }
        & .mobile-menu-buttons {
          opacity: 0;
          animation: ${linkFadeIn} 0.5s ease-out 0.4s forwards;
        }
        & .theme-toggle-wrapper {
          opacity: 0;
          animation: ${linkFadeIn} 0.5s ease-out 0.45s forwards;
        }
      `}
`;

// Removed the CloseIcon styled component

export const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-size: 1.4rem;
  text-align: left;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card + '99'};
  }
`;

export const MobileMenuButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + '40'};
`;


export const ThemeToggleButton = styled.button`
  --icon-fill: ${({ theme }) => theme.text_primary};
  --icon-fill-hover: ${({ theme }) => theme.primary};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  .sun-and-moon > :is(.moon, .sun, .sun-beams) { transform-origin: center; }
  .sun-and-moon > :is(.moon, .sun) { fill: var(--icon-fill); }
  &:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) { fill: var(--icon-fill-hover); }
  .sun-and-moon > .sun-beams { stroke: var(--icon-fill); stroke-width: 2px; }
  &:is(:hover, :focus-visible) .sun-and-moon > .sun-beams { stroke: var(--icon-fill-hover); }
  [data-theme="dark"] & .sun-and-moon > .sun { transform: scale(1.75); }
  [data-theme="dark"] & .sun-and-moon > .sun-beams { opacity: 0; }
  [data-theme="dark"] & .sun-and-moon > .moon > circle { transform: translateX(-7px); }
  @supports (cx: 1) { [data-theme="dark"] & .sun-and-moon > .moon > circle { cx: 17; transform: translateX(0); } }
  @media (prefers-reduced-motion: no-preference) {
    & .sun-and-moon > .sun { transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25); }
    & .sun-and-moon > .sun-beams { transition: transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25), opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1); }
    & .sun-and-moon .moon > circle { transition: transform 0.25s cubic-bezier(0, 0, 0, 1); }
    @supports (cx: 1) { & .sun-and-moon .moon > circle { transition: cx 0.25s cubic-bezier(0, 0, 0, 1); } }
    [data-theme="dark"] & .sun-and-moon > .sun { transition-timing-function: cubic-bezier(0.25, 0, 0.3, 1); transition-duration: 0.25s; transform: scale(1.75); }
    [data-theme="dark"] & .sun-and-moon > .sun-beams { transition-duration: 0.15s; transform: rotateZ(-25deg); }
    [data-theme="dark"] & .sun-and-moon > .moon > circle { transition-duration: 0.5s; transition-delay: 0.25s; }
  }
`;

export const ModernThemeToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 1.5rem;
  width: 100%;
`;

export const ModernThemeToggleSwitch = styled.label`
  position: relative;
  width: 90px;
  height: 40px;
  
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.card};
    box-shadow: 
      inset 4px 4px 8px ${({ theme }) => theme.black + '1A'},
      inset -4px -4px 8px ${({ theme }) => theme.white + '1A'};
    transition: .4s;
    border-radius: 40px;
    
    & .sun-icon, & .moon-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.text_primary + '99'};
        transition: .4s;
    }
    
    & .sun-icon {
        left: 12px;
    }
    
    & .moon-icon {
        right: 12px;
    }
  }

  & .slider:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 32px;
    left: 4px;
    bottom: 4px;
    background: ${({ theme }) => `linear-gradient(145deg, ${theme.card_light}, ${theme.card})`};
    box-shadow: 
        2px 2px 4px ${({ theme }) => theme.black + '26'},
        -2px -2px 4px ${({ theme }) => theme.white + '26'};
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.card};
  }

  input:checked + .slider:before {
    transform: translateX(50px);
  }
`;


export const OSButton = styled.button`
  border: 1.8px solid ${({ theme }) => theme.primary};
  background-color: transparent;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
      transform: scale(1.05);
  }

  @media screen and (max-width: 768px) { 
    font-size: 14px;
    padding: 0 16px;
  }
`;