import styled from 'styled-components';

// === STYLED COMPONENTS (Naya "Futuristic Command Hub" Design) ===

export const DashboardContainer = styled.div`
  display: flex;
  position: relative; 
  min-height: 100vh;
  background-color: #0a0c10;
  color: #c7d2fe;
  font-family: 'Roboto Mono', monospace;
`;

export const Sidebar = styled.div`
  width: 260px;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  border-right: 1px solid #30363d;
  padding: 25px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 2000;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const SidebarTitle = styled.h1`
  color: #58a6ff;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 2px;
  text-shadow: 0 0 5px #58a6ff;
`;

export const NavItem = styled.div`
  padding: 15px 20px;
  color: ${({ active }) => (active ? '#c7d2fe' : '#8b949e')};
  background-color: ${({ active }) => (active ? 'rgba(88, 166, 255, 0.1)' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 3px solid ${({ active }) => (active ? '#58a6ff' : 'transparent')};

  &:hover {
    background-color: rgba(88, 166, 255, 0.15);
    color: #c7d2fe;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 30px 50px;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const DashboardHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #0d1117;
    border-bottom: 1px solid #30363d;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
`;

export const MobileMenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  color: #58a6ff;
  z-index: 1;
`;

export const HeaderHomeIcon = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  color: #58a6ff;
  z-index: 1;
`;

export const Header = styled.h2`
  color: #c7d2fe;
  font-size: 2.5rem;
  margin-bottom: 25px;
  border-bottom: 1px solid #30363d;
  padding-bottom: 15px;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding-top: 60px; /* Header ke liye jagah */
  }
`;

export const ActionButton = styled.button`
  padding: 8px 15px;
  border: 1px solid ${({ color }) => color || '#58a6ff'};
  border-radius: 5px;
  cursor: pointer;
  margin-left: 8px;
  background-color: transparent;
  color: ${({ color }) => color || '#58a6ff'};
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Roboto Mono', monospace;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color }) => color || '#58a6ff'};
    color: #0a0c10;
    box-shadow: 0 0 10px ${({ color }) => color || '#58a6ff'};
  }
`;

export const AddButton = styled(ActionButton)`
    margin-bottom: 25px;
    padding: 12px 20px;
    font-size: 1rem;
    margin-left: 0;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
`;

export const ModalContent = styled.div`
    background-color: #0d1117;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    border: 1px solid #30363d;
    box-shadow: 0 0 25px rgba(88, 166, 255, 0.3);
`;

export const Form = styled.form``;
export const FormGroup = styled.div`
    margin-bottom: 20px;
`;
export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: #8b949e;
    font-size: 0.9rem;
`;
export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #30363d;
    background: #010409;
    color: #c7d2fe;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: #58a6ff;
      box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
    }
`;
export const Textarea = styled.textarea`
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #30363d;
    background: #010409;
    color: #c7d2fe;
    min-height: 120px;
    resize: vertical;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: #58a6ff;
      box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
    }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
export const ItemCard = styled.div`
  background: #0d1117;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #30363d;
`;
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;
export const ItemInfo = styled.div``;
export const ItemTitle = styled.h3`
  font-size: 1.5rem;
  color: #c7d2fe;
`;
export const ItemSubtitle = styled.p`
  font-size: 1rem;
  color: #8b949e;
`;
export const ItemDate = styled.p`
  font-size: 0.9rem;
  color: #58a6ff;
  margin-top: 5px;
`;
export const ItemActions = styled.div`
  display: flex;
  gap: 10px;
`;
export const ItemDesc = styled.p`
    color: #8b949e;
    line-height: 1.7;
`;

export const SkillsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
export const SkillCategory = styled.div`
    background: #0d1117;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #30363d;
`;
export const CategoryTitle = styled.h3`
    color: #58a6ff;
    font-size: 1.6rem;
    margin-bottom: 20px;
    border-bottom: 1px solid #30363d;
    padding-bottom: 10px;
`;
export const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;
export const SkillCard = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #010409;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #30363d;
    transition: all 0.2s ease;
    &:hover {
        transform: translateY(-3px);
        border-color: #58a6ff;
    }
`;
export const SkillImage = styled.img`
    width: 24px;
    height: 24px;
`;
export const SkillName = styled.span`
    color: #c7d2fe;
`;
export const DeleteButton = styled.button`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #da3633;
    color: white;
    border: 1px solid #f85149;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s ease;
    ${SkillCard}:hover & {
        opacity: 1;
        transform: scale(1);
    }
`;

export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.div`
  background: #0d1117;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #30363d;
`;

export const CardTitle = styled.h3`
  color: #58a6ff;
  font-size: 1.6rem;
  margin-bottom: 20px;
  border-bottom: 1px solid #30363d;
  padding-bottom: 10px;
`;

export const HealthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const CircularProgress = styled.div` position: relative; width: 120px; height: 120px; flex-shrink: 0; `;
export const ProgressSVG = styled.svg` width: 100%; height: 100%; transform: rotate(-90deg); `;
export const ProgressCircle = styled.circle` fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease-out; `;
export const ProgressBackground = styled(ProgressCircle)` stroke: #30363d; `;
export const ProgressBar = styled(ProgressCircle)` stroke: #58a6ff; stroke-dasharray: 283; stroke-dashoffset: ${({ offset }) => offset}; `;
export const ProgressText = styled.span` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.8rem; font-weight: bold; color: #58a6ff; `;
export const SuggestionsContainer = styled.div` display: flex; flex-direction: column; gap: 10px; `;
export const SuggestionItem = styled.div` display: flex; align-items: center; gap: 10px; color: ${({ type }) => (type === 'warning' ? '#f85149' : type === 'suggestion' ? '#e3b341' : '#3fb950')}; font-size: 0.9rem; `;

export const HeatmapContainer = styled.div` height: 300px; width: 100%; `;

export const CommandPaletteContainer = styled.div`
  height: 300px;
  background-color: #010409;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
export const CommandOutput = styled.pre`
  flex-grow: 1;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #c7d2fe;
  font-size: 0.9rem;
  line-height: 1.6;
`;
export const CommandInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border-top: 1px solid #30363d;
  padding-top: 10px;
`;
export const CommandInput = styled(Input)`
  flex-grow: 1;
  background-color: transparent;
  border: none;
`;

export const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
`;

export const StatCard = styled.div`
    background: linear-gradient(145deg, #0d1117, #161b22);
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #30363d;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
`;

export const StatIcon = styled.div`
    font-size: 2.5rem;
    color: #58a6ff;
`;
export const StatInfo = styled.div``;
export const StatNumber = styled.h3`
    font-size: 2.2rem;
    color: #c7d2fe;
`;
export const StatLabel = styled.p`
    font-size: 1rem;
    color: #8b949e;
`;

