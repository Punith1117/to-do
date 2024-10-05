import { addProject } from ".";
import { formatDateDayFirst } from ".";

export function handleAddProject() {
    let addProjectDialog = document.querySelector('.add-dialog');
    addProjectDialog.showModal();
    let cancelButton = addProjectDialog.querySelector('.cancel');
    cancelButton.addEventListener('click', handleCancelButtonClick);
    let submitButton = addProjectDialog.querySelector('.submit');
    submitButton.addEventListener('click', handleSubmitButtonClick)

    function handleCancelButtonClick() {
        addProjectDialog.close();
        removeEventListeners();
    }
    
    function handleSubmitButtonClick(e) {
        e.preventDefault();
        let form = addProjectDialog.querySelector('form');
        let name = form.querySelector('.name-input');
        let dueDate = form.querySelector('.date-input');
        let priority = form.querySelector('#options');
        let description = form.querySelector('.description-input');
        if (form.checkValidity()) {
            addProject(name.value, formatDateDayFirst(dueDate.value), priority.value, description.value);
            console.log('project successfully added');
            addProjectDialog.close();
            removeEventListeners();
        } else {
            alert('Name and Date are required');
        }

    }

    function removeEventListeners() {
        cancelButton.removeEventListener('click', handleCancelButtonClick);
        submitButton.removeEventListener('click', handleSubmitButtonClick);
    }
}
