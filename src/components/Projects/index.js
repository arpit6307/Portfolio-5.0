import React, { useState, useEffect } from 'react';
import {
  Container,
  Wrapper,
  Title,
  Desc,
  ToggleButtonGroup,
  ToggleButton,
  ProjectsContainer,
  ProjectList,
  ProjectListItem,
  ProjectPreview,
  PreviewImage,
  PreviewDetails,
  PreviewTitle,
  PreviewDate,
  PreviewTags,
  PreviewTag,
  PreviewDescription,
  PreviewMembers,
  PreviewAvatar,
  // Mobile Carousel
  MobileCarouselContainer,
  CarouselWrapper,
  CarouselSlide,
  CarouselImage,
  CarouselInfo,
  CarouselTitle,
  CarouselTags,
  CarouselTag,
  CarouselDots,
  CarouselDot
} from './ProjectsStyle';
import { projects } from '../../data/constants';

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeProject, setActiveProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let currentProjects = [];
    if (toggle === 'all') {
      currentProjects = projects;
    } else {
      currentProjects = projects.filter((item) => item.category === toggle);
    }
    setFilteredProjects(currentProjects);
    
    if (currentProjects.length > 0) {
      setActiveProject(currentProjects[0]);
      setCurrentSlide(0); 
    } else {
      setActiveProject(null);
    }
  }, [toggle]);

  const handleListItemClick = (project) => {
    setOpenModal({ state: true, project: project });
  };
  
  // Carousel swipe logic
  useEffect(() => {
    const wrapper = document.getElementById('carousel-wrapper');
    if (!wrapper) return;

    const handleScroll = () => {
        const slideWidth = wrapper.offsetWidth;
        const newSlide = Math.round(wrapper.scrollLeft / slideWidth);
        setCurrentSlide(newSlide);
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [filteredProjects]);


  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup>
          {['all', 'web app', 'android app', 'machine learning'].map(category => (
            <ToggleButton
              key={category}
              active={toggle === category}
              onClick={() => setToggle(category)}
              value={category}
            >
              {category.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        
        {/* Desktop View: Interactive Showcase */}
        <ProjectsContainer>
          <ProjectList>
            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                isActive={activeProject && activeProject.id === project.id}
                onMouseEnter={() => setActiveProject(project)}
                onClick={() => handleListItemClick(project)}
              >
                {project.title}
              </ProjectListItem>
            ))}
          </ProjectList>

          <ProjectPreview>
            {activeProject && (
              <>
                <PreviewImage src={activeProject.image} key={activeProject.id} />
                <PreviewDetails key={`details-${activeProject.id}`}>
                  <PreviewTitle>{activeProject.title}</PreviewTitle>
                  <PreviewDate>{activeProject.date}</PreviewDate>
                  <PreviewTags>
                    {activeProject.tags?.map((tag, index) => (
                      <PreviewTag key={index}>{tag}</PreviewTag>
                    ))}
                  </PreviewTags>
                  <PreviewDescription>{activeProject.description}</PreviewDescription>
                  {activeProject.member && (
                    <PreviewMembers>
                      {activeProject.member.map((member, index) => (
                        <PreviewAvatar key={index} src={member.img} />
                      ))}
                    </PreviewMembers>
                  )}
                </PreviewDetails>
              </>
            )}
          </ProjectPreview>
        </ProjectsContainer>

        {/* Mobile View: Story-Reel Carousel */}
        <MobileCarouselContainer>
          <CarouselWrapper id="carousel-wrapper">
            {filteredProjects.map((project) => (
              <CarouselSlide key={project.id} onClick={() => handleListItemClick(project)}>
                <CarouselImage src={project.image} />
                <CarouselInfo>
                  <CarouselTitle>{project.title}</CarouselTitle>
                  <CarouselTags>
                    {project.tags?.slice(0, 3).map((tag, index) => ( // Show max 3 tags
                      <CarouselTag key={index}>{tag}</CarouselTag>
                    ))}
                  </CarouselTags>
                </CarouselInfo>
              </CarouselSlide>
            ))}
          </CarouselWrapper>
          <CarouselDots>
            {filteredProjects.map((_, index) => (
              <CarouselDot key={index} isActive={index === currentSlide} />
            ))}
          </CarouselDots>
        </MobileCarouselContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;

