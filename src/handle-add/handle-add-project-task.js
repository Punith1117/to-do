import { addTaskToProject, formatDateDayFirst } from "..";

export function handleAddProjectTask(projectIndex) {
    let addTaskDialog = document.querySelector('.add-dialog');
    addTaskDialog.showModal();
    let cancelButton = addTaskDialog.querySelector('.cancel');
    cancelButton.addEventListener('click', handleCancelClick);
    let submitButton = addTaskDialog.querySelector('.submit');
    submitButton.addEventListener('click', handleSubmitClick);

    function handleCancelClick() {
        removeEventListeners();
        addTaskDialog.close();
        console.log('new task not added')
    }
    
    function handleSubmitClick(e) {
        e.preventDefault();
        let form = addTaskDialog.querySelector('form');
        if (form.checkValidity()) {
            let name = form.querySelector('.name-input');
            let dueDate = form.querySelector('.date-input');
            let priority = form.querySelector('#options');
            let description = form.querySelector('.description-input');
            addTaskToProject(projectIndex, name.value, formatDateDayFirst(dueDate.value), priority.value, description.value)
            removeEventListeners();
            addTaskDialog.close();
            console.log('new task added');
        } else {
            alert('name and due-date required');
        }
    }
    
    function removeEventListeners() {
        cancelButton.removeEventListener('click', handleCancelClick);
        submitButton.removeEventListener('click', handleSubmitClick);
    }
}