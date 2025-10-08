import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { 
    FaTachometerAlt, FaProjectDiagram, FaCode, FaBriefcase, FaGraduationCap, 
    FaPlus, FaTrash, FaEdit, FaBars, FaTimes, FaHome, FaExclamationTriangle, FaLightbulb, FaTerminal
} from 'react-icons/fa';

// === STYLED COMPONENTS (Naye Features ke Saath Updated) ===

const DashboardContainer = styled.div`
  display: flex;
  position: relative; 
  min-height: 100vh;
  background-color: #0a0c10;
  color: #c7d2fe;
  font-family: 'Roboto Mono', monospace;
`;

const Sidebar = styled.div`
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

const SidebarTitle = styled.h1`
  color: #58a6ff;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 2px;
  text-shadow: 0 0 5px #58a6ff;
`;

const NavItem = styled.div`
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

const MainContent = styled.div`
  flex-grow: 1;
  padding: 30px 50px;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DashboardHeader = styled.div`
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

const MobileMenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  color: #58a6ff;
  z-index: 1;
`;

const HeaderHomeIcon = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  color: #58a6ff;
  z-index: 1;
`;

const Header = styled.h2`
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

const ActionButton = styled.button`
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

const AddButton = styled(ActionButton)`
    margin-bottom: 25px;
    padding: 12px 20px;
    font-size: 1rem;
    margin-left: 0;
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
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

const Form = styled.form``;
const FormGroup = styled.div`
    margin-bottom: 20px;
`;
const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: #8b949e;
    font-size: 0.9rem;
`;
const Input = styled.input`
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
const Textarea = styled.textarea`
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

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const ItemCard = styled.div`
  background: #0d1117;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #30363d;
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;
const ItemInfo = styled.div``;
const ItemTitle = styled.h3`
  font-size: 1.5rem;
  color: #c7d2fe;
`;
const ItemSubtitle = styled.p`
  font-size: 1rem;
  color: #8b949e;
`;
const ItemDate = styled.p`
  font-size: 0.9rem;
  color: #58a6ff;
  margin-top: 5px;
`;
const ItemActions = styled.div`
  display: flex;
  gap: 10px;
`;
const ItemDesc = styled.p`
    color: #8b949e;
    line-height: 1.7;
`;

const SkillsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const SkillCategory = styled.div`
    background: #0d1117;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #30363d;
`;
const CategoryTitle = styled.h3`
    color: #58a6ff;
    font-size: 1.6rem;
    margin-bottom: 20px;
    border-bottom: 1px solid #30363d;
    padding-bottom: 10px;
`;
const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;
const SkillCard = styled.div`
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
const SkillImage = styled.img`
    width: 24px;
    height: 24px;
`;
const SkillName = styled.span`
    color: #c7d2fe;
`;
const DeleteButton = styled.button`
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

// --- NAYE FEATURES KE LIYE STYLES ---
const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const OverviewCard = styled.div`
  background: #0d1117;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #30363d;
`;

const CardTitle = styled.h3`
  color: #58a6ff;
  font-size: 1.6rem;
  margin-bottom: 20px;
  border-bottom: 1px solid #30363d;
  padding-bottom: 10px;
`;

const HealthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const CircularProgress = styled.div` position: relative; width: 120px; height: 120px; flex-shrink: 0; `;
const ProgressSVG = styled.svg` width: 100%; height: 100%; transform: rotate(-90deg); `;
const ProgressCircle = styled.circle` fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease-out; `;
const ProgressBackground = styled(ProgressCircle)` stroke: #30363d; `;
const ProgressBar = styled(ProgressCircle)` stroke: #58a6ff; stroke-dasharray: 283; stroke-dashoffset: ${({ offset }) => offset}; `;
const ProgressText = styled.span` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.8rem; font-weight: bold; color: #58a6ff; `;
const SuggestionsContainer = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const SuggestionItem = styled.div` display: flex; align-items: center; gap: 10px; color: ${({ type }) => (type === 'warning' ? '#f85149' : type === 'suggestion' ? '#e3b341' : '#3fb950')}; font-size: 0.9rem; `;

const HeatmapContainer = styled.div` height: 300px; width: 100%; `;

const CommandPaletteContainer = styled.div`
  height: 300px;
  background-color: #010409;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const CommandOutput = styled.pre`
  flex-grow: 1;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #c7d2fe;
  font-size: 0.9rem;
  line-height: 1.6;
`;
const CommandInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border-top: 1px solid #30363d;
  padding-top: 10px;
`;
const CommandInput = styled(Input)`
  flex-grow: 1;
  background-color: transparent;
  border: none;
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
    margin-bottom: 25px;
`;

const StatCard = styled.div`
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

const StatIcon = styled.div`
    font-size: 2.5rem;
    color: #58a6ff;
`;
const StatInfo = styled.div``;
const StatNumber = styled.h3`
    font-size: 2.2rem;
    color: #c7d2fe;
`;
const StatLabel = styled.p`
    font-size: 1rem;
    color: #8b949e;
`;


// === NAYE COMPONENTS ===

const PortfolioHealth = ({ projects, experiences }) => {
    const [healthScore, setHealthScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        let score = 0;
        let suggestionsList = [];
        if (projects.length > 0) {
            const projectsWithDesc = projects.filter(p => p.description && p.description.length > 50).length;
            score += (projectsWithDesc / projects.length) * 40;
            if (projects.length - projectsWithDesc > 0) {
                suggestionsList.push({ type: 'warning', text: `${projects.length - projectsWithDesc} project(s) need a better description.` });
            }
        }
        if (experiences.length > 0) {
            const experiencesWithSkills = experiences.filter(e => e.skills && e.skills.length > 0).length;
            score += (experiencesWithSkills / experiences.length) * 40;
            if (experiences.length - experiencesWithSkills > 0) {
                suggestionsList.push({ type: 'suggestion', text: `Link skills to ${experiences.length - experiencesWithSkills} experience(s).` });
            }
        }
        if (projects.length > 2) score += 10;
        if (experiences.length > 1) score += 10;
        score = Math.min(Math.round(score), 100);
        setHealthScore(score);
        if (suggestionsList.length === 0 && score >= 80) {
            suggestionsList.push({ type: 'success', text: 'System Status: All sections are well-maintained!' });
        } else if (suggestionsList.length === 0) {
             suggestionsList.push({ type: 'suggestion', text: 'Add more projects and experiences to improve health.' });
        }
        setSuggestions(suggestionsList);
    }, [projects, experiences]);

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (healthScore / 100) * circumference;

    return (
        <HealthContainer>
            <CircularProgress>
                <ProgressSVG viewBox="0 0 100 100">
                    <ProgressBackground cx="50" cy="50" r="45" />
                    <ProgressBar cx="50" cy="50" r="45" offset={offset} />
                </ProgressSVG>
                <ProgressText>{healthScore}%</ProgressText>
            </CircularProgress>
            <SuggestionsContainer>
                <h3 style={{ color: '#c7d2fe', marginBottom: '5px' }}>Portfolio Health</h3>
                {suggestions.map((item, index) => (
                    <SuggestionItem key={index} type={item.type}>
                        {item.type === 'warning' ? <FaExclamationTriangle /> : <FaLightbulb />}
                        {item.text}
                    </SuggestionItem>
                ))}
            </SuggestionsContainer>
        </HealthContainer>
    );
};

const SkillHeatmap = ({ projects, experiences, skills }) => {
    const [skillUsage, setSkillUsage] = useState({});
    useEffect(() => {
        const usage = {};
        [...projects, ...experiences].forEach(item => {
            (item.skills || item.tags || []).forEach(skillName => {
                const normalizedSkill = skillName.trim().toLowerCase();
                usage[normalizedSkill] = (usage[normalizedSkill] || 0) + 1;
            });
        });
        setSkillUsage(usage);
    }, [projects, experiences]);

    return (
        <HeatmapContainer>
            <SkillsList>
                {[...skills].sort((a,b) => (skillUsage[b.name.toLowerCase()] || 0) - (skillUsage[a.name.toLowerCase()] || 0)).map(skill => (
                    <SkillCard key={skill.id} style={{ opacity: (skillUsage[skill.name.toLowerCase()] || 0) > 0 ? 1 : 0.5, borderWidth: Math.min(1 + (skillUsage[skill.name.toLowerCase()] || 0), 4) }}>
                        {skill.image && <SkillImage src={skill.image} alt={skill.name} />}
                        <SkillName>{skill.name} ({skillUsage[skill.name.toLowerCase()] || 0})</SkillName>
                    </SkillCard>
                ))}
            </SkillsList>
        </HeatmapContainer>
    );
};

const CommandPalette = ({ projects, skills, experiences, education }) => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('Welcome to Command Hub! Type "help" for a list of commands.');

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const [cmd, ...args] = command.split(' ');
            let result = `> ${command}\n`;
            switch (cmd) {
                case 'help': result += 'Available Commands:\n - stats --all\n - show projects [--category=react]\n - find skill --name=firebase'; break;
                case 'stats': result += `Projects: ${projects.length}\nSkills: ${skills.length}\nExperiences: ${experiences.length}\nEducation: ${education.length}`; break;
                case 'show':
                    if (args[0] === 'projects') {
                        const categoryArg = args.find(a => a.startsWith('--category='));
                        const category = categoryArg ? categoryArg.split('=')[1] : null;
                        const filtered = category ? projects.filter(p => p.category.toLowerCase() === category.toLowerCase()) : projects;
                        result += filtered.map(p => `- ${p.title} (${p.category})`).join('\n');
                    } else { result += `Error: Unknown target "${args[0]}" for command "show".`; }
                    break;
                case 'find':
                     if (args[0] === 'skill' && args[1] === '--name' && args[2]) {
                        const skillName = args[2].toLowerCase();
                        const foundIn = [...projects, ...experiences].filter(item => (item.tags || item.skills || []).map(s => s.toLowerCase()).includes(skillName));
                        result += `Skill "${skillName}" is used in ${foundIn.length} items.`;
                    } else { result += 'Error: Invalid syntax for "find". Use "find skill --name=react".'; }
                    break;
                default: result += `Error: Command not found "${cmd}". Type "help".`;
            }
            setOutput(result);
            setCommand('');
        }
    };

    return (
        <CommandPaletteContainer>
            <CommandOutput>{output}</CommandOutput>
            <CommandInputWrapper>
                <FaTerminal style={{color: '#58a6ff'}}/>
                <CommandInput value={command} onChange={e => setCommand(e.target.value)} onKeyDown={handleCommand} placeholder="Type command and press Enter..."/>
            </CommandInputWrapper>
        </CommandPaletteContainer>
    );
};


// --- UPDATED OVERVIEW COMPONENT ---
const DashboardOverview = ({ projects, skills, experiences, education }) => (
    <div>
        <Header>System Overview</Header>
        
        {/* STATS CARDS YAHAN TOP PAR ADD KIYE GAYE HAIN */}
        <StatsContainer>
            <StatCard><StatIcon><FaProjectDiagram /></StatIcon><StatInfo><StatNumber>{projects.length}</StatNumber><StatLabel>Projects</StatLabel></StatInfo></StatCard>
            <StatCard><StatIcon><FaCode /></StatIcon><StatInfo><StatNumber>{skills.length}</StatNumber><StatLabel>Skills</StatLabel></StatInfo></StatCard>
            <StatCard><StatIcon><FaBriefcase /></StatIcon><StatInfo><StatNumber>{experiences.length}</StatNumber><StatLabel>Experiences</StatLabel></StatInfo></StatCard>
            <StatCard><StatIcon><FaGraduationCap /></StatIcon><StatInfo><StatNumber>{education.length}</StatNumber><StatLabel>Education</StatLabel></StatInfo></StatCard>
        </StatsContainer>

        <OverviewGrid>
            <OverviewCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Portfolio Health</CardTitle>
                <PortfolioHealth projects={projects} experiences={experiences} />
            </OverviewCard>

            <OverviewCard>
                <CardTitle>Skill Heatmap</CardTitle>
                <SkillHeatmap projects={projects} experiences={experiences} skills={skills} />
            </OverviewCard>

            <OverviewCard>
                <CardTitle>Command Palette</CardTitle>
                <CommandPalette projects={projects} skills={skills} experiences={experiences} education={education}/>
            </OverviewCard>
        </OverviewGrid>
    </div>
);


// --- Manage Skills Component ---
const ManageSkills = ({ skills, fetchSkills }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', category: '', image: '' });

    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSkill(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.name || !newSkill.category) return alert("Name and category are required.");
        await addDoc(collection(db, "skills"), newSkill);
        fetchSkills();
        setIsModalOpen(false);
        setNewSkill({ name: '', category: '', image: '' });
        alert("New skill added!");
    };

    const handleDeleteSkill = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            await deleteDoc(doc(db, "skills", id));
            fetchSkills();
            alert("Skill deleted!");
        }
    };

    return (
        <div>
            <Header>Manage Skills</Header>
            <AddButton onClick={() => setIsModalOpen(true)}><FaPlus /> Add New Skill</AddButton>
            <SkillsGrid>
                {Object.keys(groupedSkills).sort().map(category => ( 
                    <SkillCategory key={category}>
                        <CategoryTitle>{category}</CategoryTitle>
                        <SkillsList>
                            {groupedSkills[category].map(skill => (
                                <SkillCard key={skill.id}>
                                    {skill.image && <SkillImage src={skill.image} alt={skill.name} />}
                                    <SkillName>{skill.name}</SkillName>
                                    <DeleteButton onClick={() => handleDeleteSkill(skill.id)}><FaTrash size={10}/></DeleteButton>
                                </SkillCard>
                            ))}
                        </SkillsList>
                    </SkillCategory>
                ))}
            </SkillsGrid>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent style={{maxWidth: '500px'}}>
                        <Header>Add New Skill</Header>
                        <Form onSubmit={handleAddSkill}>
                            <FormGroup><Label>Skill Name</Label><Input name="name" value={newSkill.name} onChange={handleInputChange} placeholder="e.g., React" required /></FormGroup>
                            <FormGroup><Label>Category</Label><Input name="category" value={newSkill.category} onChange={handleInputChange} placeholder="e.g., Frontend" required /></FormGroup>
                            <FormGroup><Label>Image URL (Optional)</Label><Input name="image" value={newSkill.image} onChange={handleInputChange} placeholder="https://.../react.svg" /></FormGroup>
                            <ModalActions>
                                <ActionButton type="button" color="#8b949e" onClick={() => setIsModalOpen(false)}>Cancel</ActionButton>
                                <ActionButton type="submit">Add Skill</ActionButton>
                            </ModalActions>
                        </Form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </div>
    );
};


// --- Universal Reusable CRUD Component ---
const CrudManager = ({ title, singularTitle, items, fetchItems, collectionName, fields }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const buttonText = singularTitle || title.slice(0, -1);

    const handleOpenModal = (item = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${buttonText}?`)) {
            await deleteDoc(doc(db, collectionName, id));
            fetchItems();
            alert(`${buttonText} deleted!`);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemData = Object.fromEntries(formData.entries());

        fields.forEach(field => {
            if (field.type === 'tags' && itemData[field.name]) {
                itemData[field.name] = itemData[field.name].split(',').map(tag => tag.trim());
            }
        });

        if (currentItem) {
            await updateDoc(doc(db, collectionName, currentItem.id), itemData);
            alert(`${buttonText} updated successfully!`);
        } else {
            await addDoc(collection(db, collectionName), itemData);
            alert(`New ${buttonText} added successfully!`);
        }
        fetchItems();
        handleCloseModal();
    };

    return (
        <div>
            <Header>Manage {title}</Header>
            <AddButton onClick={() => handleOpenModal()}><FaPlus /> Add New {buttonText}</AddButton>
            <ItemContainer>
                {items.map(item => (
                    <ItemCard key={item.id}>
                        <ItemHeader>
                            <ItemInfo>
                                <ItemTitle>{item[fields[0].name]}</ItemTitle>
                                <ItemSubtitle>{item[fields[1].name]}</ItemSubtitle>
                                <ItemDate>{item[fields[2].name]}</ItemDate>
                            </ItemInfo>
                            <ItemActions>
                                <ActionButton color="#58a6ff" onClick={() => handleOpenModal(item)}><FaEdit/></ActionButton>
                                <ActionButton color="#da3633" onClick={() => handleDelete(item.id)}><FaTrash/></ActionButton>
                            </ItemActions>
                        </ItemHeader>
                        <ItemDesc>{item.desc || item.description}</ItemDesc>
                    </ItemCard>
                ))}
            </ItemContainer>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <Header>{currentItem ? `Edit ${buttonText}` : `Add New ${buttonText}`}</Header>
                        <Form onSubmit={handleFormSubmit}>
                            {fields.map(field => (
                                <FormGroup key={field.name}>
                                    <Label>{field.label}</Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea name={field.name} defaultValue={currentItem?.[field.name]} required={field.required} />
                                    ) : (
                                        <Input 
                                            name={field.name} 
                                            defaultValue={currentItem?.[field.name]?.join ? currentItem?.[field.name].join(', ') : currentItem?.[field.name]} 
                                            placeholder={field.placeholder}
                                            required={field.required} 
                                        />
                                    )}
                                </FormGroup>
                            ))}
                            <ModalActions>
                                <ActionButton type="button" color="#8b949e" onClick={handleCloseModal}>Cancel</ActionButton>
                                <ActionButton type="submit">Save</ActionButton>
                            </ModalActions>
                        </Form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </div>
    );
};


// === MAIN ADMIN DASHBOARD COMPONENT ===
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]); 
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();

  const fetchCollection = useCallback(async (collectionName, setState) => {
    const data = await getDocs(collection(db, collectionName));
    setState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, []);

  useEffect(() => {
    fetchCollection('projects', setProjects);
    fetchCollection('skills', setSkills);
    fetchCollection('experiences', setExperiences);
    fetchCollection('education', setEducation);
  }, [fetchCollection]);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview projects={projects} skills={skills} experiences={experiences} education={education} />;
      case 'projects':
        return <CrudManager 
                    title="Projects"
                    items={projects} 
                    fetchItems={() => fetchCollection('projects', setProjects)} 
                    collectionName="projects"
                    fields={[
                        { name: 'title', label: 'Title', required: true }, { name: 'category', label: 'Category', required: true },
                        { name: 'date', label: 'Date', placeholder: 'e.g., Jun 2023 - Dec 2023' },
                        { name: 'description', label: 'Description', type: 'textarea', required: true },
                        { name: 'tags', label: 'Tags (comma separated)', type: 'tags' },
                        { name: 'github', label: 'GitHub Link' }, { name: 'webapp', label: 'Live App Link' },
                    ]}
                />;
      case 'skills':
        return <ManageSkills skills={skills} fetchSkills={() => fetchCollection('skills', setSkills)} />;
      case 'experiences':
        return <CrudManager 
                    title="Experiences"
                    items={experiences} 
                    fetchItems={() => fetchCollection('experiences', setExperiences)} 
                    collectionName="experiences"
                    fields={[
                        { name: 'role', label: 'Role', required: true }, { name: 'company', label: 'Company', required: true },
                        { name: 'date', label: 'Date', required: true, placeholder: 'e.g., Jan 2023 - Present' },
                        { name: 'desc', label: 'Description', type: 'textarea', required: true },
                        { name: 'skills', label: 'Skills (comma separated)', type: 'tags' },
                        { name: 'doc', label: 'Company Logo URL' },
                    ]}
                />;
      case 'education':
        return <CrudManager 
                    title="Education" singularTitle="Education"
                    items={education} 
                    fetchItems={() => fetchCollection('education', setEducation)} 
                    collectionName="education"
                    fields={[
                        { name: 'school', label: 'School/College Name', required: true }, { name: 'degree', label: 'Degree', required: true },
                        { name: 'date', label: 'Date', required: true, placeholder: 'e.g., Aug 2020 - May 2024' },
                        { name: 'desc', label: 'Description/Grade', type: 'textarea' },
                        { name: 'img', label: 'School Logo URL' },
                    ]}
                />;
      default:
        return <Header>Welcome to the Dashboard</Header>;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarTitle>COMMAND HUB</SidebarTitle>
        <NavItem active={activeSection === 'overview'} onClick={() => handleNavClick('overview')}><FaTachometerAlt /> Overview</NavItem>
        <NavItem active={activeSection === 'projects'} onClick={() => handleNavClick('projects')}><FaProjectDiagram /> Projects</NavItem>
        <NavItem active={activeSection === 'skills'} onClick={() => handleNavClick('skills')}><FaCode /> Skills</NavItem>
        <NavItem active={activeSection === 'experiences'} onClick={() => handleNavClick('experiences')}><FaBriefcase /> Experiences</NavItem>
        <NavItem active={activeSection === 'education'} onClick={() => handleNavClick('education')}><FaGraduationCap /> Education</NavItem>
        <NavItem onClick={() => navigate('/')} style={{ marginTop: 'auto', borderTop: '1px solid #30363d', paddingTop: '20px' }}>
            <FaHome /> Go to Home
        </NavItem>
      </Sidebar>
      <MainContent>
        <DashboardHeader>
            <MobileMenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuIcon>
            <h2 style={{color: '#58a6ff', fontSize: '1.2rem'}}>COMMAND HUB</h2>
            <HeaderHomeIcon onClick={() => navigate('/')}>
                <FaHome />
            </HeaderHomeIcon>
        </DashboardHeader>
        {renderSection()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;

