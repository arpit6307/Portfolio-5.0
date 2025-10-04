import React, { useEffect, useState } from 'react';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink, ThemeToggleButton, OSButton } from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaGithub, FaSignOutAlt } from 'react-icons/fa';
import PersonIcon from '@mui/icons-material/Person';
import { Bio } from '../../data/constants';
import { useAuth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
  const { currentUser, logout } = useAuth(); 
  const navigate = useNavigate();

  // Scroll detection useEffect remains the same (for desktop active links)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveLink(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/#about'); 
  }

  // Function to handle protected GitHub click (for both desktop and mobile)
  const handleGithubClick = (e) => {
    if (!currentUser) {
      e.preventDefault(); // Stop default navigation
      navigate('/auth'); // Redirect to login page
    } else {
      window.open(Bio.github, '_blank');
    }
    // Agar mobile menu open hai, toh usse close kar do
    if (isOpen) {
      setIsOpen(false);
    }
  }

  // Function to handle protected Login/Logout click (for both desktop and mobile)
  const handleAuthClick = () => {
    if (currentUser) {
      handleLogout();
    } else {
      navigate('/auth');
    }
    // Agar mobile menu open hai, toh usse close kar do
    if (isOpen) {
      setIsOpen(false);
    }
  }

  // **** FINAL WORKING FIX: Direct Scroll Implementation ****
  // This ensures smooth scrolling without conflicts and closes the menu.
  const handleMobileLinkClick = (sectionId) => {
    // 1. Menu close ho jayega
    setIsOpen(false);
    
    // 2. Direct Scroll: Element ko target karega aur smooth scroll karega.
    const element = document.getElementById(sectionId);
    if (element) {
      // Use requestAnimationFrame for smooth scrolling next tick to ensure menu is closed first
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // 3. URL Hash ko update karein taki address bar mein section dikhe
    window.history.pushState(null, null, `/#${sectionId}`);
  }

  // Auth Button Content (Login/Logout text and icon)
  const AuthButtonContent = currentUser ? (
    <>
      <FaSignOutAlt style={{ fontSize: '1.2rem', marginRight: '8px' }} />
      Logout
    </>
  ) : (
    <>
      <PersonIcon style={{ fontSize: '1.2rem', marginRight: '8px' }} />
      Login
    </>
  );

  // Theme Toggle Button
  const newThemeToggle = (
    <ThemeToggleButton onClick={() => setDarkMode(!darkMode)} title="Toggles light & dark" aria-label="auto" aria-live="polite">
      <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </ThemeToggleButton>
  );

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => {
            setIsOpen(!isOpen)
          }} />
        </MobileIcon>
        <NavItems>
          {/* Desktop NavLinks use standard href="#section" */}
          <NavLink href="#about" className={activeLink === 'about' ? 'active' : ''}>About</NavLink>
          <NavLink href='#skills' className={activeLink === 'skills' ? 'active' : ''}>Skills</NavLink>
          <NavLink href='#experience' className={activeLink === 'experience' ? 'active' : ''}>Experience</NavLink>
          <NavLink href='#projects' className={activeLink === 'projects' ? 'active' : ''}>Projects</NavLink>
          <NavLink href='#education' className={activeLink === 'education' ? 'active' : ''}>Education</NavLink>
          <NavLink href="#contact" className={activeLink === 'contact' ? 'active' : ''}>Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          <OSButton onClick={handleAuthClick}>
            {AuthButtonContent}
          </OSButton>
          <GitHubButton 
            as="button" 
            onClick={handleGithubClick}
            title={!currentUser ? "Login required to view code" : "Visit GitHub"}
          >
            <FaGithub style={{ fontSize: '1.2rem' }} />
          </GitHubButton>
          {newThemeToggle}
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            {/* Mobile NavLinks: onClick with section ID for direct scroll */}
            <MobileLink onClick={() => handleMobileLinkClick('about')}>About</MobileLink>
            <MobileLink onClick={() => handleMobileLinkClick('skills')}>Skills</MobileLink>
            <MobileLink onClick={() => handleMobileLinkClick('experience')}>Experience</MobileLink>
            <MobileLink onClick={() => handleMobileLinkClick('projects')}>Projects</MobileLink>
            <MobileLink onClick={() => handleMobileLinkClick('education')}>Education</MobileLink>
            <MobileLink onClick={() => handleMobileLinkClick('contact')}>Contact</MobileLink>
            
            {/* GitHub Button: protected and closes menu via handleGithubClick */}
            <GitHubButton 
              as="button"
              onClick={handleGithubClick} 
              style={{ 
                fontSize: '1.5rem', 
                padding: '10px 16px', 
                background: `${({ theme }) => theme.primary}`, 
                color: 'white', 
                width: 'max-content' 
              }}
            >
              <FaGithub />
            </GitHubButton>
            
            {/* Auth Button: handles login/logout and closes menu via handleAuthClick */}
            <OSButton onClick={handleAuthClick}>
              {AuthButtonContent}
            </OSButton>
            
            {newThemeToggle}
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar
