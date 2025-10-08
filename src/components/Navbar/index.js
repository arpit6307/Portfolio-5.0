import React, { useEffect, useState } from 'react';
import {
  Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton,
  ButtonContainer, MobileIcon, MobileMenu, MobileLink, ThemeToggleButton,
  OSButton, MobileMenuButtonWrapper, MenuOverlay, ModernThemeToggleSwitch, ModernThemeToggleWrapper
} from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { 
    FaBars, FaGithub, FaSignOutAlt, FaUser, FaCode, FaBriefcase, 
    FaGraduationCap, FaEnvelope, FaProjectDiagram, FaSun, FaMoon, FaUserShield 
} from 'react-icons/fa';
import PersonIcon from '@mui/icons-material/Person';
import { Bio } from '../../data/constants';
import { useAuth } from '../../utils/Auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode, hideAdminButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

    if (location.pathname === '/') {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/#about');
  }

  const handleGithubClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      navigate('/auth');
    } else {
      window.open(Bio.github, '_blank');
    }
    setIsOpen(false);
  }

  const handleAuthClick = () => {
    if (currentUser) {
      handleLogout();
    } else {
      navigate('/auth');
    }
    setIsOpen(false);
  }

  const handleNavLinkClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname.startsWith('/admin') || location.pathname === '/auth') {
        navigate(`/#${sectionId}`);
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

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

  // Desktop Toggle
  const newThemeToggle = (
    <ThemeToggleButton onClick={toggleTheme} title="Toggles light & dark" aria-label="auto" aria-live="polite">
      <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask className="moon" id="moon-mask"><rect x="0" y="0" width="100%" height="100%" fill="white" /><circle cx="24" cy="10" r="6" fill="black" /></mask>
        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g className="sun-beams" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></g>
      </svg>
    </ThemeToggleButton>
  );

  // Mobile Toggle Switch
  const mobileThemeToggle = (
    <ModernThemeToggleWrapper className="theme-toggle-wrapper">
      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Theme</span>
      <ModernThemeToggleSwitch>
        <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
        <span className="slider">
            <FaSun className="sun-icon"/>
            <FaMoon className="moon-icon"/>
        </span>
      </ModernThemeToggleSwitch>
    </ModernThemeToggleWrapper>
  );

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink onClick={() => handleNavLinkClick('about')} className={activeLink === 'about' ? 'active' : ''}>About</NavLink>
          <NavLink onClick={() => handleNavLinkClick('skills')} className={activeLink === 'skills' ? 'active' : ''}>Skills</NavLink>
          <NavLink onClick={() => handleNavLinkClick('experience')} className={activeLink === 'experience' ? 'active' : ''}>Experience</NavLink>
          <NavLink onClick={() => handleNavLinkClick('projects')} className={activeLink === 'projects' ? 'active' : ''}>Projects</NavLink>
          <NavLink onClick={() => handleNavLinkClick('education')} className={activeLink === 'education' ? 'active' : ''}>Education</NavLink>
          <NavLink onClick={() => handleNavLinkClick('contact')} className={activeLink === 'contact' ? 'active' : ''}>Contact</NavLink>
        </NavItems>
        <ButtonContainer>
            {/* Logic to hide/show Admin and Auth buttons */}
            {!hideAdminButton && (
              <>
                {currentUser && (
                  <OSButton onClick={() => navigate('/admin/dashboard')} title="Admin Dashboard">
                    <FaUserShield style={{ fontSize: '1.2rem' }} />
                  </OSButton>
                )}
                <OSButton onClick={handleAuthClick}>
                  {AuthButtonContent}
                </OSButton>
              </>
            )}
             {/* Logout button dashboard par bhi dikhega agar user logged in hai */}
             {hideAdminButton && currentUser && (
                <OSButton onClick={handleAuthClick}>
                    {AuthButtonContent}
                </OSButton>
             )}
          <GitHubButton
            as="button"
            onClick={handleGithubClick}
            title={!currentUser ? "Login required to view code" : "Visit GitHub"}
          >
            <FaGithub style={{ fontSize: '1.2rem' }} />
          </GitHubButton>
          {newThemeToggle}
        </ButtonContainer>
      </NavbarContainer>

      {/* Mobile Menu */}
      <MenuOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <MobileMenu isOpen={isOpen}>
        <MobileLink onClick={() => handleNavLinkClick('about')}><FaUser /> About</MobileLink>
        <MobileLink onClick={() => handleNavLinkClick('skills')}><FaCode /> Skills</MobileLink>
        <MobileLink onClick={() => handleNavLinkClick('experience')}><FaBriefcase /> Experience</MobileLink>
        <MobileLink onClick={() => handleNavLinkClick('projects')}><FaProjectDiagram /> Projects</MobileLink>
        <MobileLink onClick={() => handleNavLinkClick('education')}><FaGraduationCap /> Education</MobileLink>
        <MobileLink onClick={() => handleNavLinkClick('contact')}><FaEnvelope /> Contact</MobileLink>

        {!hideAdminButton && currentUser && (
            <MobileLink onClick={() => { navigate('/admin/dashboard'); setIsOpen(false); }}>
                <FaUserShield /> Admin Panel
            </MobileLink>
        )}

        <MobileMenuButtonWrapper className="mobile-menu-buttons">
          <OSButton onClick={handleAuthClick} style={{ padding: '8px 16px', height: 'auto', flex: 1 }}>
            {AuthButtonContent}
          </OSButton>
          <GitHubButton
            as="button"
            onClick={handleGithubClick}
            style={{ padding: '10px 14px', height: 'auto' }}
          >
            <FaGithub style={{ fontSize: '1.5rem' }} />
          </GitHubButton>
        </MobileMenuButtonWrapper>
        {mobileThemeToggle}
      </MobileMenu>
    </Nav>
  )
}

export default Navbar;

