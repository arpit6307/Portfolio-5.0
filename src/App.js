import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Admin panel components ko import karein
import AdminLogin from "./components/Admin/AdminLogin.js";
import AdminDashboard from "./components/Admin/AdminDashboard.js";
import ProtectedRoute from "./components/Admin/ProtectedRoute.js";


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

// Main content component
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
    <Footer />
  </>
);

const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const [darkMode, setDarkMode] = useState(true);
    const [openModal, setOpenModal] = useState({ state: false, project: null });
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

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
    
    // Admin routes ko hide/show karne ke liye check
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            {/* Navbar sirf non-admin routes par dikhayein */}
            {!isAdminRoute && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
            <Body>
                {!isAdminRoute && <CustomCursor />}
                {!isAdminRoute && <Chatbot />}
                
                <CommandPalette
                    isOpen={isPaletteOpen}
                    onClose={() => setIsPaletteOpen(false)}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
                
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home openModal={openModal} setOpenModal={setOpenModal} />} />
                    <Route path="/auth" element={<AuthPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route 
                        path="/admin/dashboard" 
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>

                {!isAdminRoute && <ScrollToTop />}
                {openModal.state &&
                    <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                }
            </Body>
        </ThemeProvider>
    );
}


function App() {
  return (
    <Router>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    </Router>
  );
}

export default App;
