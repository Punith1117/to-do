import { deleteProjectTask, formatDateDayFirst, formatDateYearFirst } from ".";
import { displayProjectTasks } from "./display-project-tasks";

export function handleDeleteProjectTask(projectIndex, taskIndex) {
    let projects = JSON.parse(localStorage.getItem('projectsArray'));
    let tasks = projects[projectIndex].tasks;
    let task = tasks[taskIndex];
    let deleteDialog = document.querySelector('.delete-dialog');
    let query = deleteDialog.querySelector('.query');
    query.textContent = 'Are you sure to delete task: ' + task.taskName;
    deleteDialog.showModal();
    let noButton = deleteDialog.querySelector('.no');
    let yesButton = deleteDialog.querySelector('.yes');
    noButton.addEventListener('click', handleNoButtonClick);
    yesButton.addEventListener('click', handleYesButtonClick);

    function handleNoButtonClick() {
        deleteDialog.close();
        console.log('delete aborted');
        removeEventListeners();
    }
    
    function handleYesButtonClick(e) {
        e.preventDefault();
        deleteProjectTask(projectIndex, taskIndex);
        deleteDialog.close();
        console.log('delete successful');
        removeEventListeners();
    }

    function removeEventListeners() {
        noButton.removeEventListener('click', handleNoButtonClick);
        yesButton.removeEventListener('click', handleYesButtonClick);
    }
}

export function handleEditProjectTask(projectIndex, taskIndex) {
    let projects = JSON.parse(localStorage.getItem('projectsArray'));
    let tasks = projects[projectIndex].tasks;
    let task = tasks[taskIndex];
    let editDialog = document.querySelector('.edit-dialog');
    let form = editDialog.querySelector('form');
    let name = form.querySelector('.name-input');
    name.value = task.taskName;
    let dueDate = form.querySelector('.date-input');
    dueDate.value = formatDateYearFirst(task.dueDate);
    let priority = form.querySelector('#options');
    priority.value = task.priority;
    let description = form.querySelector('.description-input');
    description.value = task.description;
    editDialog.showModal();
    let cancelButton = form.querySelector('.cancel');
    cancelButton.addEventListener('click', handleCancelClick);
    let submitButton = form.querySelector('.submit');
    submitButton.addEventListener('click', handleSubmitClick);

    function handleCancelClick() {
        editDialog.close();
        removeEventListeners();
    }

    function handleSubmitClick(e) {
        e.preventDefault();
        task.taskName = name.value;
        task.dueDate = formatDateDayFirst(dueDate.value);
        task.priority = priority.value;
        task.description = description.value;
        tasks[taskIndex] = task;
        projects[projectIndex].tasks = tasks;
        localStorage.setItem('projectsArray', JSON.stringify(projects));
        editDialog.close();
        displayProjectTasks(projectIndex);
        removeEventListeners();
    }

    function removeEventListeners() {
        cancelButton.removeEventListener('click', handleCancelClick);
        submitButton.removeEventListener('click', handleSubmitClick);
    }

}