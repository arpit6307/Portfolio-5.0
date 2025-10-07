import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';

// Main Container Styling
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

// Sidebar Styling
const Sidebar = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.card};
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const SidebarTitle = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
`;

const NavItem = styled.div`
  padding: 15px 20px;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text_primary)};
  background-color: ${({ theme, active }) => (active ? theme.primary + '20' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + '40'};
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

// Main Content Styling
const MainContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 2rem;
  margin-bottom: 20px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.text_primary};
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 40};
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 8px;
  background-color: ${({ color, theme }) => color || theme.primary};
  color: white;
`;

const AddButton = styled(ActionButton)`
    margin-bottom: 20px;
    padding: 10px 15px;
    font-size: 16px;
`;

// Modal and Form Styling
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.card};
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
`;

const Form = styled.form``;
const FormGroup = styled.div`
    margin-bottom: 15px;
`;
const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.text_primary};
`;
const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.text_secondary + 40};
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};
`;
const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.text_secondary + 40};
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};
    min-height: 100px;
    resize: vertical;
`;


// Projects Management Component
const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const fetchProjects = async () => {
    const projectsCollectionRef = collection(db, 'projects');
    const data = await getDocs(projectsCollectionRef);
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  
  const handleOpenModal = (project = null) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
        const projectDoc = doc(db, "projects", id);
        await deleteDoc(projectDoc);
        fetchProjects(); // Refresh list after deleting
        alert("Project deleted!");
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = Object.fromEntries(formData.entries());
    projectData.tags = projectData.tags.split(',').map(tag => tag.trim()); // Convert tags string to array

    if (currentProject) {
        // Update existing project
        const projectDoc = doc(db, "projects", currentProject.id);
        await updateDoc(projectDoc, projectData);
        alert("Project updated successfully!");
    } else {
        // Add new project
        await addDoc(collection(db, "projects"), projectData);
        alert("Project added successfully!");
    }
    fetchProjects(); // Refresh the list
    handleCloseModal();
  };

  return (
    <div>
      <Header>Manage Projects</Header>
      <AddButton onClick={() => handleOpenModal()}>Add New Project</AddButton>
       <DataTable>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>{project.title}</Td>
              <Td>{project.category}</Td>
              <Td>
                <ActionButton color="#2a7be0" onClick={() => handleOpenModal(project)}>Edit</ActionButton>
                <ActionButton color="#d9534f" onClick={() => handleDelete(project.id)}>Delete</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </DataTable>
      
      {isModalOpen && (
        <ModalOverlay>
            <ModalContent>
                <Header>{currentProject ? 'Edit Project' : 'Add New Project'}</Header>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input name="title" defaultValue={currentProject?.title} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Category</Label>
                        <Input name="category" defaultValue={currentProject?.category} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Textarea name="description" defaultValue={currentProject?.description} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Image URL</Label>
                        <Input name="image" defaultValue={currentProject?.image} />
                    </FormGroup>
                     <FormGroup>
                        <Label>Tags (comma separated)</Label>
                        <Input name="tags" defaultValue={currentProject?.tags?.join(', ')} />
                    </FormGroup>
                    <FormGroup>
                        <Label>GitHub Link</Label>
                        <Input name="github" defaultValue={currentProject?.github} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Live App Link</Label>
                        <Input name="webapp" defaultValue={currentProject?.webapp} />
                    </FormGroup>
                    <ActionButton type="submit">Save Project</ActionButton>
                    <ActionButton type="button" color="#6c757d" onClick={handleCloseModal}>Cancel</ActionButton>
                </Form>
            </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};


// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout button clicked"); // Check karne ke liye ki function call ho raha hai
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out successfully");
      navigate('/'); // Homepage par redirect karein
    }).catch((error) => {
      // An error happened.
      console.error("Logout fail ho gaya", error);
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ManageProjects />;
      case 'skills':
        return <Header>Manage Skills (Coming Soon)</Header>;
      case 'experiences':
        return <Header>Manage Experiences (Coming Soon)</Header>;
      case 'education':
        return <Header>Manage Education (Coming Soon)</Header>;
      default:
        return <Header>Welcome to the Dashboard</Header>;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarTitle>Admin Panel</SidebarTitle>
        <NavItem active={activeSection === 'projects'} onClick={() => setActiveSection('projects')}>
          Projects
        </NavItem>
        <NavItem active={activeSection === 'skills'} onClick={() => setActiveSection('skills')}>
          Skills
        </NavItem>
        <NavItem active={activeSection === 'experiences'} onClick={() => setActiveSection('experiences')}>
          Experiences
        </NavItem>
        <NavItem active={activeSection === 'education'} onClick={() => setActiveSection('education')}>
          Education
        </NavItem>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Sidebar>
      <MainContent>
        {renderSection()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
