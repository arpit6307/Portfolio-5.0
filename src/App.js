import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate import kiya
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import CustomCursor from "./components/CustomCursor/index.js";
import ScrollToTop from "./components/ScrollToTop/index.js";
import CommandPalette from "./components/CommandPalette/index.js";
import Chatbot from "./components/Chatbot/index.js";
import GithubActivity from "./components/GithubActivity/index.js";
import AuthPage from './components/Auth';
import { AuthProvider } from './utils/Auth';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`

// New Component to wrap the main content
const Home = ({ openModal, setOpenModal }) => (
  <>
    <HeroSection />
    <Wrapper>
      <Skills />
      <Experience />
    </Wrapper>
    <Projects openModal={openModal} setOpenModal={setOpenModal} />
    <GithubActivity />
    <Wrapper>
      <Education />
      <Contact />
    </Wrapper>
    <Footer /> {/* Footer sirf Home component mein rakha gaya hai */}
  </>
);

// New component for Auth Route to handle NavLink clicks properly
const AuthRoute = () => {
  const navigate = useNavigate();

  // Yahaan ek simple useEffect use kiya gaya hai taki jab bhi koi NavLink click ho
  // (jo ki #section_id use karta hai), woh / par redirect ho jaaye.
  useEffect(() => {
    const handleHashChange = () => {
      // Agar hash (#about, #skills, etc.) change hota hai, toh / par redirect kar do.
      if (window.location.hash && window.location.pathname === '/auth') {
        // Navigating to the root path and letting the hash trigger scroll on the Home component
        navigate(`/${window.location.hash}`);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigate]);

  return <AuthPage />;
}


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Yeh naya anokha logic hai jo theme badalne par `data-theme` attribute set karta hai
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <AuthProvider>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Body>
            <CustomCursor />
            <Chatbot />
            <CommandPalette
              isOpen={isPaletteOpen}
              onClose={() => setIsPaletteOpen(false)}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            {/* Main Content Routing */}
            <Routes>
                {/* Home route will render the full portfolio including Footer */}
                <Route path="/" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                
                {/* Auth route will render AuthPage + Footer (Footer is now inside AuthPage) */}
                <Route path="/auth" element={<AuthRoute />} />

                {/* Keep old SPA structure routes for section navigation */}
                <Route path="/#about" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                <Route path="/#skills" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                <Route path="/#experience" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                <Route path="/#projects" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                <Route path="/#education" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                <Route path="/#contact" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
            </Routes>

            <ScrollToTop />
            {openModal.state &&
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            }
          </Body>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
