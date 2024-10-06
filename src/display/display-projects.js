import { createAddDialog } from "../create-add-edit-dialog";
import { createDeleteDialog } from "../create-delete-dialog";
import { displayProjectTasks } from "../display/display-project-tasks";
import { handleAddProject } from "../handle-add/handle-add-project";
import { handleDeleteProject } from "../utilities/project-utilities";
import { handleEditProject } from "../utilities/project-utilities";

export function displayProjects() {
    let content = document.querySelector('.content');
    content.innerHTML = '';
    let addProjectButton = document.createElement('button');
    addProjectButton.type = 'button';
    addProjectButton.textContent = 'add Project';
    addProjectButton.addEventListener('click', () => {
        handleAddProject();
    })
    let addProjectSection = document.createElement('div');
    addProjectSection.appendChild(addProjectButton);
    content.appendChild(addProjectSection);

    let projectsSection = document.createElement('div');
    projectsSection.classList.add('projects-section');

    let projectsInStorage = JSON.parse(localStorage.getItem('projectsArray'));
    if (projectsInStorage.length != 0) {
        projectsInStorage.forEach((project, index) => {
            let projectDiv = document.createElement('div');
            projectDiv.className = 'project';
                let nameSection = document.createElement('div');
                nameSection.className = 'name-section';
                nameSection.textContent = 'Name: ' + project.name;
                let dueDateSection = document.createElement('div');
                dueDateSection.className = 'dueDate-section';
                dueDateSection.textContent = 'Due Date: ' + project.dueDate;
                let prioritySection = document.createElement('div');
                prioritySection.className = 'priority-section';
                prioritySection.textContent = 'Priority: ' + project.priority;
                if (project.priority == 'high') {
                    prioritySection.classList.add('high-priority');
                } else {
                    prioritySection.classList.add('low-priority');
                }
                let descriptionSection;
                if (project.description != '') {
                    descriptionSection = document.createElement('div');
                    descriptionSection.className = 'description-section';
                    descriptionSection.textContent = 'Description: ' + project.description;
                }
                let openSection = document.createElement('div');
                openSection.className = 'open-button-section'
                    let openButton = document.createElement('button');
                    openButton.className = 'open';
                    openButton.textContent = 'open'
                    openButton.addEventListener('click', () => { displayProjectTasks(index)})
                openSection.appendChild(openButton);
                let editDeleteSection = document.createElement('div');
                editDeleteSection.className = 'edit-delete-section';
                    let editButton = document.createElement('button');
                    editButton.className = 'edit';
                    editButton.textContent = 'edit'
                    editButton.addEventListener('click', () => { handleEditProject(index) })
                    let deleteButton = document.createElement('button');
                    deleteButton.className = 'delete';
                    deleteButton.textContent = 'delete';
                    deleteButton.addEventListener('click', () => { handleDeleteProject(index) });
                editDeleteSection.appendChild(editButton);
                editDeleteSection.appendChild(deleteButton);
            projectDiv.appendChild(nameSection);
            projectDiv.appendChild(dueDateSection);
            projectDiv.appendChild(prioritySection);
            if (project.description != '') {
                projectDiv.appendChild(descriptionSection);
            }
            projectDiv.appendChild(openSection);
            projectDiv.appendChild(editDeleteSection);
        
            projectsSection.appendChild(projectDiv)
        })
        
        content.appendChild(projectsSection);
    } else {
        projectsSection.textContent = 'No projects';
        content.appendChild(projectsSection);
    }
    let addDialog = createAddDialog();
    content.appendChild(addDialog);
    let editDialog = createAddDialog();
    editDialog.className = 'edit-dialog';
    content.appendChild(editDialog);
    let deleteDialog = createDeleteDialog();
    content.appendChild(deleteDialog);
}