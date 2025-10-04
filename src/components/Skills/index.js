import React, { useState, useEffect } from 'react';
import { skills } from '../../data/constants';
import {
  Container,
  Wrapper,
  Title,
  Desc,
  SkillMatrixContainer,
  CategorySelector,
  CategoryButton,
  SkillGrid,
  SkillNode,
  MobileSkillsContainer,
  DigitalSpine,
  Vertebra,
  VertebraHeader,
  SkillBranch,
  SkillLeaf,
} from './SkillsStyle';


// --- DESKTOP COMPONENT: The Skill Synthesizer ---
const SkillSynthesizerComponent = ({ skillData }) => {
  // Set the first category as active by default
  const [activeCategory, setActiveCategory] = useState(skillData[0].title);

  // Find the skills for the currently active category
  const activeSkills = skillData.find(cat => cat.title === activeCategory)?.skills || [];

  return (
    <SkillMatrixContainer>
      <CategorySelector>
        {skillData.map((category) => (
          <CategoryButton
            key={category.title}
            active={activeCategory === category.title}
            onClick={() => setActiveCategory(category.title)}
          >
            {category.title}
          </CategoryButton>
        ))}
      </CategorySelector>
      <SkillGrid>
        {activeSkills.map((skill, index) => (
          <SkillNode key={index}>
            <img src={skill.image} alt={skill.name} />
            <span>{skill.name}</span>
          </SkillNode>
        ))}
      </SkillGrid>
    </SkillMatrixContainer>
  );
};


// --- MOBILE COMPONENT: The Digital Spine ---
const DigitalSpineComponent = ({ skillData }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (title) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <MobileSkillsContainer>
      <DigitalSpine />
      {skillData.map((category) => (
        <Vertebra key={category.title} onClick={() => toggleCategory(category.title)}>
          <VertebraHeader>
            {category.title}
            <span>{openCategory === category.title ? '−' : '+'}</span>
          </VertebraHeader>
          <SkillBranch isOpen={openCategory === category.title}>
            {category.skills.map((skill) => (
              <SkillLeaf key={skill.name}>
                <img src={skill.image} alt={skill.name} />
                {skill.name}
              </SkillLeaf>
            ))}
          </SkillBranch>
        </Vertebra>
      ))}
    </MobileSkillsContainer>
  );
};

// --- MAIN SKILLS COMPONENT ---
const Skills = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          I thrive on turning complex problems into elegant solutions. Explore my technical toolkit.
        </Desc>
        
        {isMobile ? (
          <DigitalSpineComponent skillData={skills} />
        ) : (
          <SkillSynthesizerComponent skillData={skills} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Skills;

