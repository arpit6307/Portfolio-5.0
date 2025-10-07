import React from 'react';
import styled, { keyframes } from 'styled-components';
import { skills } from '../../data/constants';

// Keyframes for animations
const orbit = keyframes`
  from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
`;

const orbit2 = keyframes`
  from { transform: rotate(0deg) translateX(250px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(250px) rotate(-360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(133, 76, 230, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(133, 76, 230, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(133, 76, 230, 0); }
`;

// Main Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0;
  background: ${({ theme }) => `radial-gradient(ellipse at bottom, ${theme.card_light}, ${theme.bg})`};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

export const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
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
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 50px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Desktop Orbit View
const SkillOrbitContainer = styled.div`
  width: 700px;
  height: 700px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

const CentralCore = styled.div`
  width: 150px;
  height: 150px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 0 30px ${({ theme }) => theme.primary};
  animation: ${pulse} 2s infinite;
`;

const SkillIcon = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.card + '99'};
  backdrop-filter: blur(5px);
  border: 2px solid ${({ theme }) => theme.primary + '80'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  // Assigning animations based on props
  animation: ${({ animation }) => animation} ${({ duration }) => duration}s linear infinite;

  &:hover {
    animation-play-state: paused;
    transform: scale(1.2) !important; // Important to override animation transform
    box-shadow: 0 0 25px ${({ theme }) => theme.primary};
    z-index: 10;
  }

  &:hover > span {
    opacity: 1;
    transform: translateY(60px);
  }
`;

const SkillImage = styled.img`
  width: 40px;
  height: 40px;
`;

const SkillName = styled.span`
  position: absolute;
  opacity: 0;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.card + '99'};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
`;

// Mobile View
const MobileSkillsContainer = styled.div`
    display: none;
    width: 100%;
    
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
`;

const SkillCategory = styled.div`
    width: 100%;
    max-width: 350px;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.primary + '40'};
    border-radius: 16px;
    padding: 20px;
    animation: ${fadeIn} 0.5s ease-out;
`;

const CategoryTitle = styled.h3`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    margin-bottom: 16px;
`;

const MobileSkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
`;

const MobileSkillItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: ${({ theme }) => theme.card_light};
    border: 1px solid ${({ theme }) => theme.primary + '50'};
    border-radius: 10px;
    color: ${({ theme }) => theme.text_primary + 90};
    font-weight: 500;
`;

const Skills = () => {
  // We need to split skills into two orbits for the desktop view
  const frontendSkills = skills.find(s => s.title === 'Frontend')?.skills || [];
  const backendSkills = skills.find(s => s.title === 'Backend')?.skills || [];
  const otherSkills = skills.find(s => s.title === 'Others')?.skills || [];
  
  const orbit1Skills = [...frontendSkills.slice(0, 6), ...otherSkills.slice(0, 2)];
  const orbit2Skills = [...backendSkills, ...frontendSkills.slice(6), ...otherSkills.slice(2)];

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Tech Stack</Title>
        <Desc>
            A universe of technologies I've explored, from crafting beautiful frontends to building robust backends.
        </Desc>
        
        {/* Desktop Orbit */}
        <SkillOrbitContainer>
          <CentralCore>Skills</CentralCore>
          {orbit1Skills.map((item, index) => (
            <SkillIcon 
              key={`orbit1-${index}`}
              animation={orbit}
              duration={20 + index * 2} // Vary duration for more dynamic feel
              style={{ animationDelay: `-${index * 2}s` }} // Stagger start positions
            >
              <SkillImage src={item.image} />
              <SkillName>{item.name}</SkillName>
            </SkillIcon>
          ))}
          {orbit2Skills.map((item, index) => (
            <SkillIcon 
              key={`orbit2-${index}`}
              animation={orbit2}
              duration={30 + index * 2}
              style={{ animationDelay: `-${index * 3}s` }}
            >
              <SkillImage src={item.image} />
              <SkillName>{item.name}</SkillName>
            </SkillIcon>
          ))}
        </SkillOrbitContainer>

        {/* Mobile List */}
        <MobileSkillsContainer>
            {skills.map((category, index) => (
                <SkillCategory key={`cat-${index}`}>
                    <CategoryTitle>{category.title}</CategoryTitle>
                    <MobileSkillList>
                        {category.skills.map((item, itemIndex) => (
                            <MobileSkillItem key={`mobileskill-${itemIndex}`}>
                                <SkillImage src={item.image} />
                                {item.name}
                            </MobileSkillItem>
                        ))}
                    </MobileSkillList>
                </SkillCategory>
            ))}
        </MobileSkillsContainer>

      </Wrapper>
    </Container>
  );
};

export default Skills;

