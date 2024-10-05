import { addTask } from ".";

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
        addTask(nameInput.value, formatDate(dueDateInput.value), priorityInput.value, descriptionInput.value);
        inputDialog.close();
    } else {
        alert('Name and Due Date must be filled.')
    }
}
function removeEventListeners() {
    cancelButton.removeEventListener('click', handleCancelButtonClick);
    submitButton.removeEventListener('click', handleSubmitButtonClick);
}

function formatDate(date) {
    const day = date.slice(-2); // Ensure 2 digits
    const month = date.slice(5,7);
    const year = date.slice(0,4);
    return `${day}-${month}-${year}`;
}