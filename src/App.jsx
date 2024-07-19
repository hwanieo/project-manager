import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSidebar from './components/ProjectSidebar';
import NewProject from './components/NewProject';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(task) {
    setProjectState((prevProjectState) => {
      const taskId = Math.random();

      const newTasks = {
        id: taskId,
        projectId: prevProjectState.selectedProjectId,
        text: task,
      };

      return {
        ...prevProjectState,
        tasks: [newTasks, ...prevProjectState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevProjectState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevProjectState,
        selectedProjectId: projectId,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  }

  function handleSelectProject(selectedId) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: selectedId,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectId // 이미 selectedId가 들어있기 때문에 따로 받을 수 없음
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      tasks={projectState.tasks}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onCancelAddProject={handleCancelAddProject}
        onAddProject={handleAddProject}
      />
    );
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
