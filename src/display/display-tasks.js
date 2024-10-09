import { createAddDialog } from "../create-add-edit-dialog";
import { createDeleteDialog } from "../create-delete-dialog";
import { handleAddTask } from "../handle-add/handle-add-task";
import { handleDeleteTask } from "../utilities/task-utilities";
import { handleEditTask } from "../utilities/task-utilities";

export function displayTasks() {
    let content = document.querySelector('.content');
    content.innerHTML = '';
    let tasksInStorage = JSON.parse(localStorage.getItem('tasksArray'));

    let addTaskButton = document.createElement('button');
    addTaskButton.type = 'button';
    addTaskButton.textContent = '+';
    addTaskButton.className = 'add';
    addTaskButton.title = 'add simple-task';
    addTaskButton.addEventListener('click', () => {
        handleAddTask();
    });

    
    let addTaskSection = document.createElement('div');
    addTaskSection.appendChild(addTaskButton);
    content.appendChild(addTaskSection);
    let tasksSection = document.createElement('div');
    tasksSection.className = 'tasks-section';
    
    if (tasksInStorage.length != 0) {
        tasksInStorage.forEach((task, index) => {
            let taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            let taskNameDiv = document.createElement('div');
            taskNameDiv.textContent = 'Name: ' + task.taskName;
            let taskDueDateDiv = document.createElement('div');
            taskDueDateDiv.textContent = 'Due Date: ' + task.dueDate;
            let taskPriorityDiv = document.createElement('div');
            taskPriorityDiv.className = 'priority-section';
            taskPriorityDiv.textContent = 'Priority: ' + task.priority;
                if (task.priority == 'high') {
                    taskPriorityDiv.classList.add('high-priority');
                } else {
                    taskPriorityDiv.classList.add('low-priority');
                }
            let taskDescriptionDiv;
            if (task.description != '') {
                taskDescriptionDiv = document.createElement('div');
                taskDescriptionDiv.textContent = 'Description: ' + task.description;
            }
            
            let utilityButtonsDiv = document.createElement('div');
            let editButton = document.createElement('button');
            editButton.textContent = 'edit';
            editButton.addEventListener('click', () => { handleEditTask(index) })
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', () => { handleDeleteTask(index)});
            utilityButtonsDiv.appendChild(editButton);
            utilityButtonsDiv.appendChild(deleteButton);
            
            taskDiv.appendChild(taskNameDiv);
            taskDiv.appendChild(taskDueDateDiv);
            taskDiv.appendChild(taskPriorityDiv);
            if (task.description != '') {
                taskDiv.appendChild(taskDescriptionDiv);
            }
            taskDiv.appendChild(utilityButtonsDiv);
            tasksSection.appendChild(taskDiv);
        })
        
        content.appendChild(tasksSection);
        
    } else {
        tasksSection.textContent = 'No task';
        content.appendChild(tasksSection);
    }
    
    let addTaskDialog = createAddDialog();
    content.appendChild(addTaskDialog);
    let deleteTaskDialog = createDeleteDialog();
    content.appendChild(deleteTaskDialog);
    let editTaskDialog = createAddDialog();
    editTaskDialog.classList.remove('add-dialog');
    editTaskDialog.classList.add('edit-dialog');
    content.appendChild(editTaskDialog);
}