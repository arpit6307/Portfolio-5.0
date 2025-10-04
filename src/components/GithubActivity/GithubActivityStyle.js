import styled from 'styled-components';

export const Container = styled.div`
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

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const Title = styled.h1`
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

export const ActivityContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ActivityItem = styled.a`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background: ${({ theme }) => theme.card_light + '99'};
    border: 1px solid ${({ theme }) => theme.primary + '20'};
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.card_light};
        border-color: ${({ theme }) => theme.primary};
    }
`;

export const ActivityIcon = styled.div`
    color: ${({ theme }) => theme.primary};
    margin-top: 2px;
`;

export const ActivityDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ActivityText = styled.div`
    font-size: 0.95rem;
    line-height: 1.5;
`;

export const RepoLink = styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
`;

export const ActivityDate = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 4px;
    align-self: flex-end;
`;

export const ErrorText = styled.div`
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    margin-top: 20px;
`;
