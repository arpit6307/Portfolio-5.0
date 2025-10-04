import React from 'react'
import styled from 'styled-components'
import { experiences } from '../../data/constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
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
        flex-direction: column;
    }
`;

const Title = styled.div`
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

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const Experience = () => {
    const theme = useTheme();
    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <Desc>
                    My work experience as a software engineer and working on different companies and projects.
                </Desc>
                <VerticalTimeline lineColor={theme.text_secondary + '80'}>
                    {experiences.map((experience, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: theme.card, color: theme.text_primary, boxShadow: 'rgba(23, 92, 230, 0.15) 0px 4px 24px' }}
                            contentArrowStyle={{ borderRight: `7px solid  ${theme.card}` }}
                            date={experience.date}
                            iconStyle={{ background: theme.primary, color: '#fff' }}
                            icon={<img src={experience.img} alt="company logo" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                        >
                            <h3 className="vertical-timeline-element-title" style={{ color: theme.text_primary, fontWeight: '600' }}>{experience.role}</h3>
                            <h4 className="vertical-timeline-element-subtitle" style={{ color: theme.text_secondary, fontWeight: '500' }}>{experience.company}</h4>
                            <p style={{ color: theme.text_secondary + '99' }}>
                                {experience.desc}
                            </p>
                            {experience.skills && (
                                <div style={{ marginTop: '10px' }}>
                                    <b>Skills:</b>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                                        {experience.skills.map((skill, i) => (
                                            <span key={i} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '8px', background: theme.primary + '20', color: theme.primary }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>

            </Wrapper>
        </Container>
    )
}

export default Experience
