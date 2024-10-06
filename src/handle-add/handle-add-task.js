import { addTask } from "..";
import { formatDateDayFirst } from "..";
let inputDialog;
let form;
let cancelButton;
let submitButton;
export function handleAddTask() {
    inputDialog = document.querySelector('.add-dialog');
    form = inputDialog.querySelector('form');
    cancelButton = inputDialog.querySelector('.cancel');
    submitButton = inputDialog.querySelector('.submit');
    inputDialog.showModal();
    cancelButton.addEventListener('click', handleCancelButtonClick);
    submitButton.addEventListener('click', handleSubmitButtonClick);
}

function handleCancelButtonClick() {
    inputDialog.close();
    removeEventListeners();
}
function handleSubmitButtonClick(event) {
    event.preventDefault();
    if(form.checkValidity()) {
        let nameInput = form.querySelector('.name-input');
        let dueDateInput = form.querySelector('.date-input');
        let priorityInput = form.querySelector('#options');
        let descriptionInput = form.querySelector('.description-input');
        addTask(nameInput.value, formatDateDayFirst(dueDateInput.value), priorityInput.value, descriptionInput.value);
        removeEventListeners();
        inputDialog.close();
    } else {
        alert('Name and Due Date must be filled.')
    }
}
function removeEventListeners() {
    cancelButton.removeEventListener('click', handleCancelButtonClick);
    submitButton.removeEventListener('click', handleSubmitButtonClick);
}
