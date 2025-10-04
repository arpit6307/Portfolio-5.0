import React from 'react'
import styled, { useTheme } from 'styled-components'
import { education } from '../../data/constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
padding: 0px 0px 60px 0px;
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
padding: 40px 0px 0px 0px;
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

const Education = () => {
    const theme = useTheme();
    return (
        <Container id="education">
            <Wrapper>
                <Title>Education</Title>
                <Desc>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Desc>
                <VerticalTimeline lineColor={theme.text_secondary + '80'}>
                    {education.map((edu, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: theme.card, color: theme.text_primary, boxShadow: 'rgba(23, 92, 230, 0.15) 0px 4px 24px' }}
                            contentArrowStyle={{ borderRight: `7px solid ${theme.card}` }}
                            date={edu.date}
                            iconStyle={{ background: theme.primary, color: '#fff' }}
                            icon={<img src={edu.img} alt="school logo" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                        >
                            <h3 className="vertical-timeline-element-title" style={{ color: theme.text_primary, fontWeight: '600' }}>{edu.school}</h3>
                            <h4 className="vertical-timeline-element-subtitle" style={{ color: theme.text_secondary, fontWeight: '500' }}>{edu.degree}</h4>
                            <p style={{ color: theme.text_secondary + '99' }}>
                                Grade: {edu.grade}
                            </p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </Wrapper>
        </Container>
    )
}

export default Education
