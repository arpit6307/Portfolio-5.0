import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CloseRounded } from '@mui/icons-material';

// AUTH IMPORTS
import { useAuth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';


// ======================== ANIMATION KEYFRAMES ========================

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;


// ======================== STYLED COMPONENTS ========================

const Container = styled.div`
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    transition: all 0.5s ease;

    ${({ isClosing }) =>
        isClosing
            ? css`
                  animation: ${fadeOut} 0.5s ease-out forwards;
              `
            : css`
                  animation: ${fadeIn} 0.5s ease-in forwards;
              `}
`;

const Wrapper = styled.div`
    max-width: 800px;
    width: 100%;
    border-radius: 16px;
    margin: 50px 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${({ theme }) => theme.card};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;

    ${({ isClosing }) =>
        isClosing
            ? css`
                  animation: ${slideOut} 0.5s ease-out forwards;
              `
            : css`
                  animation: ${slideIn} 0.5s ease-in forwards;
              `}

    @media only screen and (max-width: 600px) {
        margin: 20px 12px;
        padding: 20px;
    }
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 0;

    @media only screen and (max-width: 600px) {
        font-size: 24px;
        margin: 6px 0;
    }
`;

const Date = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};

    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Image = styled.img`
    width: 100%;
    max-height: 400px; /* Limits the image height */
    object-fit: contain; /* Ensures the whole image is visible without cropping */
    border-radius: 12px;
    margin-top: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.bgLight}; /* Background added for better visibility of contained images */
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 8px;
`;

const Tag = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
    
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Desc = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    margin: 15px 0;

    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 12px 0;
    gap: 12px;
    flex-wrap: wrap; /* Added for responsive button layout */
`;

const Button = styled.a`
    flex: 1; /* Allow buttons to grow */
    min-width: 150px; /* Minimum width for better readability */
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.white};
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    
    ${({ dull, theme }) => dull && `
        background: ${theme.bgLight};
        color: ${theme.text_secondary};
    `}

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px ${({ theme }) => theme.primary + '80'};
    }

    /* Conditional Styling for Unauthenticated State */
    ${({ disabled }) => disabled && `
        cursor: not-allowed !important;
        opacity: 0.6;
        filter: none;
        box-shadow: none !important;
        &:hover {
            transform: none !important;
            box-shadow: none !important;
        }
    `}

    @media only screen and (max-width: 600px) {
        font-size: 14px;
        padding: 8px 10px;
    }
`;

const CloseButton = styled.button`
    flex: 1;
    min-width: 150px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.bgLight};
    border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        color: ${({ theme }) => theme.primary};
        border: 1px solid ${({ theme }) => theme.primary + '80'};
    }
    
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        padding: 8px 10px;
    }
`;


const Label = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 10px 0;

    @media only screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 4px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

const MemberName = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
`;

const Content = styled.div`
    /* Content wrapper to manage padding and flow */
`;


// ======================== MAIN COMPONENT ========================

const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;
    const [isClosing, setIsClosing] = useState(false);
    
    // AUTH HOOKS
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Function to handle the animated closing of the modal
    const handleClose = useCallback(() => {
        setIsClosing(true);
        // Wait for the animation (0.5s) to finish before truly closing
        setTimeout(() => {
            setOpenModal({ state: false, project: null });
            setIsClosing(false);
        }, 500); 
    }, [setOpenModal]);
    
    // Effect to close on escape key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [handleClose]);

    // Function to handle the protected "View Code" link click
    const handleProtectedLinkClick = (e, url) => {
        if (!currentUser) {
            e.preventDefault();
            // Redirect to login page as requested
            navigate('/auth'); 
            // Modal ko band karein
            handleClose(); 
        } else if (url) {
            window.open(url, '_blank');
        }
    };


    return (
        <Container isClosing={isClosing} onClick={handleClose}>
            <Wrapper isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
                {/* CloseRounded button for standard close functionality */}
                <CloseRounded
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        cursor: "pointer",
                        fontSize: '28px',
                        color: 'inherit' 
                    }}
                    onClick={handleClose}
                />
                <Content>
                    <Image src={project?.image} />
                    <Title>{project?.title}</Title>
                    <Date>{project?.date}</Date>
                    <Label>Technologies Used:</Label>
                    <Tags>
                        {project?.tags?.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </Tags>
                    <Desc>{project?.description}</Desc>
                    {project?.member && project.member.length > 0 && (
                        <>
                            <Label>Team Members</Label>
                            <Members>
                                {project.member.map((member, index) => (
                                    <Member key={index}>
                                        {member.img && <MemberImage src={member.img} />} 
                                        <MemberName>{member.name}</MemberName>
                                    </Member>
                                ))}
                            </Members>
                        </>
                    )}
                    <ButtonGroup>
                        {/* New Close Button */}
                        <CloseButton as="button" onClick={handleClose}>
                            Close Details
                        </CloseButton>
                        
                        {/* View Code Button is protected: Redirects to /auth if not logged in */}
                        <Button 
                            as="button" 
                            dull
                            disabled={!currentUser} 
                            onClick={(e) => handleProtectedLinkClick(e, project?.github)}
                        >
                            View Code {!currentUser ? ' (Login Required)' : ''}
                        </Button>
                        
                        {/* View Live App Button remains public */}
                        <Button 
                            href={project?.webapp} 
                            target='_blank' 
                            style={{ 
                                pointerEvents: project?.webapp ? 'auto' : 'none', 
                                opacity: project?.webapp ? 1 : 0.5 
                            }}
                        >
                            View Live App
                        </Button>
                    </ButtonGroup>
                </Content>
            </Wrapper>
        </Container>
    )
}

export default ProjectDetails
