import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const PaletteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
`;

export const PaletteContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.card + 'BF'};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const SearchInputWrapper = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.primary + '40'};
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

export const CommandList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

export const CommandItem = styled.li`
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  font-size: 0.95rem;

  &:hover, &.selected {
    background-color: ${({ theme }) => theme.primary + '30'};
  }
`;

export const CommandInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommandTitle = styled.span`
  font-weight: 500;
`;

export const CommandSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

export const CommandShortcut = styled.div`
  background-color: ${({ theme }) => theme.bgLight + '80'};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text_secondary};
`;
