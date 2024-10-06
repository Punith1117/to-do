import { deleteProject } from "..";
import { formatDateYearFirst } from "..";
import { formatDateDayFirst } from "..";
import { displayProjects } from "../display/display-projects";
export function handleDeleteProject(index) {
    let projectsArray = JSON.parse(localStorage.getItem('projectsArray'));
    let deleteDialog = document.querySelector('.delete-dialog');
    let query = deleteDialog.querySelector('.query');
    query.textContent = 'Are you sure to delete project: ' + projectsArray[index].name;
    let noButton = deleteDialog.querySelector('.no');
    let yesButton = deleteDialog.querySelector('.yes');
    noButton.addEventListener('click', handleNoButtonClick);
    yesButton.addEventListener('click', handleYesButtonClick);
    deleteDialog.showModal();

    function handleNoButtonClick() {
        console.log('delete aborted');
        deleteDialog.close();
        removeEventListeners();
    }

    function handleYesButtonClick() {
        deleteProject(index);
        deleteDialog.close();
        removeEventListeners();
    }
    function removeEventListeners() {
        noButton.removeEventListener('click', handleNoButtonClick);
        yesButton.removeEventListener('click', handleYesButtonClick);
    }
}

export function handleEditProject(projectNum) {
    let projectsArray = JSON.parse(localStorage.getItem('projectsArray'));
    let project = projectsArray[projectNum]
    let editDialog = document.querySelector('.edit-dialog');
        let name = editDialog.querySelector('.name-input');
        name.value = project.name;
        let dueDate = editDialog.querySelector('.date-input');
        dueDate.value = formatDateYearFirst(project.dueDate);
        let priority = editDialog.querySelector('#options');
        priority.value = project.priority;
        let description = editDialog.querySelector('.description-input');
        description.value = project.description;
    editDialog.showModal();
    let cancelButton = editDialog.querySelector('.cancel');
    cancelButton.addEventListener('click', handleCancelClick);
    let submitButton = editDialog.querySelector('.submit');
    submitButton.addEventListener('click', handleSubmitClick);

    function handleCancelClick() {
        editDialog.close();
        console.log('edit aborted');
        removeEventListeners();
    }
    
    function handleSubmitClick(e) {
        e.preventDefault();
        project.name = name.value;
        project.dueDate = formatDateDayFirst(dueDate.value);
        project.priority = priority.value;
        project.description = description.value;
        projectsArray[projectNum] = project;
        localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
        console.log('successfully edited');
        editDialog.close();
        displayProjects();
    }

    function removeEventListeners() {
        cancelButton.removeEventListener('click', handleCancelClick);
        submitButton.removeEventListener('click', handleSubmitClick);
    }
}