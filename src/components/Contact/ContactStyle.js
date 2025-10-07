import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 50px 16px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  gap: 28px;
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
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ContactMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

export const ContactCard = styled.div`
  width: 280px;
  padding: 24px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(23, 92, 230, 0.2) 0px 4px 24px;
  }
`;

export const CardIcon = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.primary};
`;

export const CardInfo = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

export const CardButton = styled.a`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 0.1);
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 10px 16px;
  border-radius: 12px;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card_light + '99'};
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  backdrop-filter: blur(10px);
  margin-top: 28px;
  gap: 18px;
`;

export const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;

export const ContactInputWrapper = styled.div`
  position: relative;
`;

export const ContactInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  &:focus ~ label, &:valid ~ label {
    top: -10px;
    left: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card_light};
    padding: 0 4px;
  }
`;

export const ContactInputMessage = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  &:focus ~ label, &:valid ~ label {
    top: -10px;
    left: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card_light};
    padding: 0 4px;
  }
`;


export const ContactLabel = styled.label`
  position: absolute;
  top: 17px;
  left: 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  pointer-events: none;
  transition: all 0.3s ease;
`;

export const ContactButton = styled.button`
  width: 100%;
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px hsla(271, 100%, 50%, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.text_secondary + '50'};
  }
`;

export const CustomSnackbar = styled.div`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  min-width: 250px;
  max-width: 80%;
  transform: translateX(50%);
  right: 50%;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 12px;
  padding: 16px;
  position: fixed;
  z-index: 10;
  bottom: 30px;
  font-size: 17px;
  transition: visibility 0.5s, opacity 0.5s;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
`;

