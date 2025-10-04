import React from 'react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
// AUTH IMPORTS
import { useAuth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Wrapper,
  Title,
  Desc,
  ContactMethods,
  ContactCard,
  CardIcon,
  CardInfo,
  CardButton,
  ContactForm,
  ContactTitle,
  ContactInputWrapper,
  ContactLabel,
  ContactInput,
  ContactInputMessage,
  ContactButton,
  CustomSnackbar,
} from './ContactStyle';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';


const Contact = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();
  
  // AUTH HOOKS
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => { setSnackbar({ open: false, message: '' }); }, 3000); // Hide after 3 seconds
  };

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    showSnackbar(`${type} copied to clipboard!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Authentication Check
    if (!currentUser) {
        showSnackbar('Please login to send a direct message!');
        navigate('/auth');
        return;
    }

    // 2. Form Submission (If authenticated)
    setIsSubmitting(true);
    emailjs.sendForm('service_tox70dd', 'template_8jaj03n', form.current, 'S5u-DG4G32b2F3Y5X')
      .then((result) => {
        showSnackbar('Message Sent Successfully!');
        form.current.reset();
        setIsSubmitting(false);
      }, (error) => {
        console.log(error.text);
        showSnackbar('Failed to send message. Please try again.');
        setIsSubmitting(false);
      });
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Here's how you can reach me.</Desc>
        
        <ContactMethods>
          <ContactCard>
            <CardIcon><EmailIcon /></CardIcon>
            <CardInfo>arpitsinghyadav56@gmail.com</CardInfo>
            <CardButton as="button" onClick={() => handleCopyToClipboard('arpitsinghyadav56@gmail.com', 'Email')}>
              Copy Email
            </CardButton>
          </ContactCard>

          <ContactCard>
            <CardIcon><LinkedInIcon /></CardIcon>
            <CardInfo>Connect on LinkedIn</CardInfo>
            <CardButton href="https://www.linkedin.com/in/arpit-singh-yadav-b675301a1/" target="_blank">
              Visit Profile
            </CardButton>
          </ContactCard>

          <ContactCard>
            <CardIcon><PhoneIcon /></CardIcon>
            <CardInfo>+91 8887547804</CardInfo>
            <CardButton as="button" onClick={() => handleCopyToClipboard('+918887547804', 'Phone number')}>
              Copy Number
            </CardButton>
          </ContactCard>
        </ContactMethods>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Or Send Me a Direct Message 🚀</ContactTitle>
          {/* Form fields are here */}
          <ContactInputWrapper>
            <ContactInput type="email" id="from_email" name="from_email" required />
            <ContactLabel htmlFor="from_email">Your Email</ContactLabel>
          </ContactInputWrapper>
          <ContactInputWrapper>
            <ContactInput type="text" id="from_name" name="from_name" required />
            <ContactLabel htmlFor="from_name">Your Name</ContactLabel>
          </ContactInputWrapper>
          <ContactInputWrapper>
            <ContactInput type="text" id="subject" name="subject" required />
            <ContactLabel htmlFor="subject">Subject</ContactLabel>
          </ContactInputWrapper>
          <ContactInputWrapper>
            <ContactInputMessage id="message" name="message" required />
            <ContactLabel htmlFor="message">Message</ContactLabel>
          </ContactInputWrapper>
          <ContactButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : (currentUser ? 'Send Message' : 'Login to Send Message')}
          </ContactButton>
        </ContactForm>
      </Wrapper>
      <CustomSnackbar open={snackbar.open}>
        {snackbar.message}
      </CustomSnackbar>
    </Container>
  )
}

export default Contact;