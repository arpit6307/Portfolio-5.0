import styled, { keyframes } from 'styled-components';

// --- General Containers ---
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0;
  background: ${({ theme }) => theme.card_light};
`;

export const Wrapper = styled.div`
  max-width: 1100px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  max-width: 600px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// --- Desktop: Skill Synthesizer Styles ---

export const SkillMatrixContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  // Hide on mobile
  @media (max-width: 960px) {
    display: none;
  }
`;

export const CategorySelector = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.primary + '40'};
  padding: 20px 0;
`;

export const CategoryButton = styled.div`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${({ theme, active }) => (active ? theme.text_primary : theme.text_secondary)};
  background: ${({ theme, active }) => (active ? theme.primary + '20' : 'transparent')};
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.primary};
    transform: ${({ active }) => (active ? 'scaleY(1)' : 'scaleY(0)')};
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
  }
`;

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

export const SkillGrid = styled.div`
  flex: 0.7;
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  gap: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SkillNode = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: ${fadeIn} 0.5s ease-out;

  img {
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
  }

  span {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
    span {
      color: ${({ theme }) => theme.text_primary};
    }
  }
`;

// --- Mobile: Digital Spine Styles ---
export const MobileSkillsContainer = styled.div`
  width: 100%;
  display: none; // Hidden on desktop
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 0 20px;

  @media (max-width: 960px) {
    display: flex; // Visible on mobile
  }
`;

export const DigitalSpine = styled.div`
  width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.primary + '00'} 0%,
    ${({ theme }) => theme.primary} 50%,
    ${({ theme }) => theme.primary + '00'} 100%
  );
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const Vertebra = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.primary + '50'};
  padding: 16px;
  z-index: 5;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const VertebraHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkillBranch = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, margin-top 0.5s ease-in-out;
  margin-top: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  padding-left: 20px;
  border-left: 2px dashed ${({ theme }) => theme.primary + '50'};
`;

export const SkillLeaf = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-bottom: 12px;
  
  img {
    width: 28px;
    height: 28px;
    background: ${({ theme }) => theme.card_light};
    padding: 4px;
    border-radius: 50%;
  }
`;

