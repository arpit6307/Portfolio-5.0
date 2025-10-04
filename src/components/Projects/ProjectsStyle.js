import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
        padding: 40px 0; /* Adjusted padding for mobile */
    }
`;

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    padding: 0 16px; /* Added padding for mobile */
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${({ active, theme }) => (active ? theme.primary : 'transparent')};
    color: ${({ active, theme }) => (active ? theme.white : theme.primary)};
    
    &:hover {
        background-color: ${({ active, theme }) => (active ? theme.primary : theme.primary + '20')};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`;


// --- DESKTOP STYLES ---

export const ProjectsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  gap: 40px;
  
  @media (max-width: 960px) {
    display: none; /* Hide on mobile */
  }
`;

export const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  max-height: 60vh; 
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.card_light};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }
`;

export const ProjectListItem = styled.li`
  padding: 16px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
  color: ${({ theme, isActive }) => (isActive ? theme.primary : theme.text_secondary)};
  background-color: ${({ theme, isActive }) => (isActive ? theme.primary + '20' : 'transparent')};
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + '30'};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + '10'};
  }
`;

export const ProjectPreview = styled.div`
  flex: 1.5;
  position: sticky;
  top: 100px;
  height: fit-content;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.3);
  animation: ${fadeIn} 0.6s ease-in-out;
  border: 2px solid ${({ theme }) => theme.primary + '50'};
`;

export const PreviewDetails = styled.div`
  padding-top: 20px;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const PreviewTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

export const PreviewDate = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 4px 0 12px 0;
`;

export const PreviewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
`;

export const PreviewTag = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 4px 10px;
  border-radius: 8px;
`;

export const PreviewDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

export const PreviewMembers = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const PreviewAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: -12px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border: 3px solid ${({ theme }) => theme.card};

  &:first-child {
      margin-left: 0;
  }
`;


// --- MOBILE CAROUSEL STYLES ---

export const MobileCarouselContainer = styled.div`
  display: none; /* Hide on desktop */
  width: 100%;
  margin-top: 30px;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* for smooth scrolling on iOS */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

export const CarouselSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  padding: 0 24px;
  scroll-snap-align: center;
  position: relative;
  cursor: pointer;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 45vh;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  border: 2px solid ${({ theme }) => theme.primary + '80'};
`;

export const CarouselInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 24px;
  right: 24px;
  padding: 16px;
  border-radius: 0 0 18px 18px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

export const CarouselTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  margin: 0 0 8px 0;
`;

export const CarouselTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CarouselTag = styled.span`
  font-size: 12px;
  background-color: ${({ theme }) => theme.primary + 'B0'};
  color: ${({ theme }) => theme.white};
  padding: 3px 8px;
  border-radius: 6px;
`;

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CarouselDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) => (isActive ? theme.primary : theme.text_secondary + '80')};
  margin: 0 5px;
  transition: background-color 0.3s ease;
`;

