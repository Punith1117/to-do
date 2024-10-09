import { createAddDialog } from "../create-add-edit-dialog.js";
import { createDeleteDialog } from "../create-delete-dialog.js";
import { displayProjects } from "../display/display-projects.js";
import { handleAddProjectTask } from "../handle-add/handle-add-project-task.js";
import { handleDeleteProjectTask, handleEditProjectTask } from "../utilities/project-task-utilities.js";

export function displayProjectTasks(projectIndex) {
    let content = document.querySelector('.content');
    content.innerHTML = '';
    let projects = JSON.parse(localStorage.getItem('projectsArray'));
    let project = projects[projectIndex];
    let projectNameDiv = document.createElement('div');
    projectNameDiv.className = 'project-name';
    projectNameDiv.textContent = 'Project: ' + project.name;
    let addButtonDiv = document.createElement('div');
        let addButton = document.createElement('button');
        addButton.className = 'add';
        addButton.textContent = '+';
        addButton.title = 'add task to project';
        addButton.addEventListener('click', () => { handleAddProjectTask(projectIndex) })
    addButtonDiv.appendChild(addButton);
    let tasksDiv = document.createElement('div');
    tasksDiv.className = 'tasks-section';
        let backButton = document.createElement('button');
        backButton.className = 'back-to-projects';
        backButton.textContent = 'back';
        backButton.addEventListener('click', () => { displayProjects() })
    tasksDiv.appendChild(backButton);
    let tasks = project.tasks;
    tasks.forEach((task, index) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';
            let taskNameDiv = document.createElement('div');
            taskNameDiv.className = 'name-section';
            taskNameDiv.textContent = 'Name: ' + task.taskName;
            let taskDueDateDiv = document.createElement('div');
            taskDueDateDiv.className = 'dueDate-section';
            taskDueDateDiv.textContent = 'Due date: ' + task.dueDate;
            let taskPriorityDiv = document.createElement('div');
            taskPriorityDiv.className = 'priority-section';
            taskPriorityDiv.textContent = 'Priority: ' + task.priority;
            (task.priority == 'high') ? (taskPriorityDiv.classList.add('high-priority')) : (taskPriorityDiv.classList.add('low-priority'))
            let taskDescriptionDiv;
            if (task.description != '') {
                taskDescriptionDiv = document.createElement('div');
                taskDescriptionDiv.className = 'description-section';
                taskDescriptionDiv.textContent = 'Description: ' + task.description;
            }
            let taskUtilityDiv = document.createElement('div');
            taskUtilityDiv.className = 'task-utility';
                let editButton = document.createElement('button');
                editButton.className = 'edit';
                editButton.textContent = 'edit';
                editButton.addEventListener('click', () => { handleEditProjectTask(projectIndex, index)})
                let deleteButton = document.createElement('button');
                deleteButton.className = 'delete';
                deleteButton.textContent = 'delete';
                deleteButton.addEventListener('click', () => { handleDeleteProjectTask(projectIndex, index)})
            taskUtilityDiv.appendChild(editButton);
            taskUtilityDiv.appendChild(deleteButton);
        taskDiv.appendChild(taskNameDiv);
        taskDiv.appendChild(taskDueDateDiv);
        taskDiv.appendChild(taskPriorityDiv);
        if (task.description != '') {
            taskDiv.appendChild(taskDescriptionDiv);
        }
        taskDiv.appendChild(taskUtilityDiv);
        tasksDiv.appendChild(taskDiv);
    })

    content.appendChild(projectNameDiv);
    content.appendChild(addButtonDiv);
    content.appendChild(tasksDiv);
    let addTaskDialog = createAddDialog();
    content.appendChild(addTaskDialog);
    let editTaskDialog = createAddDialog();
    editTaskDialog.className = 'edit-dialog';
    content.appendChild(editTaskDialog);
    let deleteTaskDialog = createDeleteDialog();
    content.appendChild(deleteTaskDialog);
}