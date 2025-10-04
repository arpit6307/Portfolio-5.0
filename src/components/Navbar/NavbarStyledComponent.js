import { Link as LinkR } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

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
  
  /* Glassmorphism Effect */
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
  transition: all 0.6s ease-in-out;
    :hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};     
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
  }
`

const linkFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// NEW MOBILE MENU DESIGN: HOLOGRAPHIC LAYER SIDEBAR
export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 28px; 
    position: fixed;
    top: 0; /* Starts from the top */
    right: 0;
    width: 90%; 
    max-width: 350px;
    height: 100vh; /* Full screen height */
    overflow-y: auto; 
    padding: 100px 2rem 50px 2rem; /* Extra padding for navbar space */
    
    /* DOUBLE LAYERED HOLOGRAPHIC EFFECT */
    background: ${({ theme }) => theme.bg + 'E0'}; /* Dark outer layer */
    border-left: 3px solid ${({ theme }) => theme.primary}; /* Primary border */
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.9), 0 0 30px ${({ theme }) => theme.primary + 'B0'}; /* Neon shadow */
    
    /* Animation Control: Slides from the right */
    transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1); 
    transform: ${({ isOpen }) => isOpen 
        ? 'translateX(0%)' 
        : 'translateX(100%)'};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0.95')};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    z-index: 100;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    /* Inner Floating Panel (for Layered depth) */
    &::before {
        content: '';
        position: fixed;
        top: 80px; /* Below Navbar */
        right: 0;
        width: 100%;
        max-width: 350px;
        height: calc(100vh - 80px);
        background: ${({ theme }) => theme.card_light + 'A0'}; /* Lighter inner card */
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        z-index: -1;
    }

    /* Link and Button Styles */
    & > a, & > button {
      animation: ${({ isOpen }) => isOpen ? css`${linkFadeIn} 0.4s ease-out forwards` : 'none'};
      opacity: 0; 
      width: 100%;
      max-width: 300px;
      text-align: left; /* Aligned to the left */
      margin: 4px 0;
    }
    
    /* Staggered entry animation */
    & > a:nth-child(1) { animation-delay: 0.1s; } 
    & > a:nth-child(2) { animation-delay: 0.15s; } 
    & > a:nth-child(3) { animation-delay: 0.2s; } 
    & > a:nth-child(4) { animation-delay: 0.25s; } 
    & > a:nth-child(5) { animation-delay: 0.3s; } 
    & > a:nth-child(6) { animation-delay: 0.35s; } 
    & > button:nth-child(7) { animation-delay: 0.4s; } 
    & > button:nth-child(8) { animation-delay: 0.45s; }
    & > button:nth-child(9) { animation-delay: 0.5s; } 
`;

export const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  font-size: 1.2rem; 
  padding: 12px 16px; 
  border-radius: 10px; 
  width: 100%; 
  
  :hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + '15'};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary + '40'};
    transform: translateX(5px);
  }

  &.active {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ThemeToggleButton = styled.button`
  --icon-fill: ${({ theme }) => theme.text_primary};
  --icon-fill-hover: ${({ theme }) => theme.primary};

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  .sun-and-moon > :is(.moon, .sun, .sun-beams) {
    transform-origin: center;
  }
  .sun-and-moon > :is(.moon, .sun) {
    fill: var(--icon-fill);
  }
  &:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) {
    fill: var(--icon-fill-hover);
  }
  .sun-and-moon > .sun-beams {
    stroke: var(--icon-fill);
    stroke-width: 2px;
  }
  &:is(:hover, :focus-visible) .sun-and-moon > .sun-beams {
    stroke: var(--icon-fill-hover);
  }
  
  [data-theme="dark"] & .sun-and-moon > .sun {
    transform: scale(1.75);
  }
  [data-theme="dark"] & .sun-and-moon > .sun-beams {
    opacity: 0;
  }
  [data-theme="dark"] & .sun-and-moon > .moon > circle {
    transform: translateX(-7px);
  }
  
  @supports (cx: 1) {
    [data-theme="dark"] & .sun-and-moon > .moon > circle {
      cx: 17;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    & .sun-and-moon > .sun {
      transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25);
    }
    & .sun-and-moon > .sun-beams {
      transition: transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25), opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
    }
    & .sun-and-moon .moon > circle {
      transition: transform 0.25s cubic-bezier(0, 0, 0, 1);
    }
    @supports (cx: 1) {
      & .sun-and-moon .moon > circle {
        transition: cx 0.25s cubic-bezier(0, 0, 0, 1);
      }
    }
    [data-theme="dark"] & .sun-and-moon > .sun {
      transition-timing-function: cubic-bezier(0.25, 0, 0.3, 1);
      transition-duration: 0.25s;
      transform: scale(1.75);
    }
    [data-theme="dark"] & .sun-and-moon > .sun-beams {
      transition-duration: 0.15s;
      transform: rotateZ(-25deg);
    }
    [data-theme="dark"] & .sun-and-moon > .moon > circle {
      transition-duration: 0.5s;
      transition-delay: 0.25s;
    }
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
  }

  @media screen and (max-width: 768px) { 
    font-size: 14px;
    padding: 0 16px;
  }
`;
