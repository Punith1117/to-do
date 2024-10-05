import { deleteTask } from ".";
import { displayTasks } from "./display-tasks";
export function handleDeleteTask(index) {
    let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    let deleteTaskDialog = document.querySelector('.delete-dialog');
    let query = deleteTaskDialog.querySelector('.query');
    query.textContent = 'Are you sure to delete task: ' + tasksArray[index].taskName;
    deleteTaskDialog.showModal();
    
    let noButton = deleteTaskDialog.querySelector('.no');
    noButton.addEventListener('click', () => { 
        deleteTaskDialog.close()
    }, { once: true });
    
    let yesButton = deleteTaskDialog.querySelector('.yes');
    yesButton.addEventListener('click', () => {
        deleteTask(index);
        deleteTaskDialog.close();
        console.log(tasksArray[index].taskName + ' successfully deleted');
    }, { once: true });
    
}

export function handleEditTask(index) {
    let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    let editTaskDialog = document.querySelector('.edit-dialog');
    let name = editTaskDialog.querySelector('.name-input');
    name.value = tasksArray[index].taskName;
    let dueDate = editTaskDialog.querySelector('.date-input');
    let priority = editTaskDialog.querySelector('select');
    priority.value = tasksArray[index].priority;
    dueDate.value = formatDateYearFirst(tasksArray[index].dueDate);
    let description = editTaskDialog.querySelector('.description-input');
    description.value = tasksArray[index].description;
    let cancelButton = editTaskDialog.querySelector('.cancel');
    let submitButton = editTaskDialog.querySelector('.submit');
    cancelButton.addEventListener('click', handleCancelClick);
    submitButton.addEventListener('click', handleSubmitClick);
    function handleCancelClick() {
        console.log('edit cancelled');
        editTaskDialog.close();
        removeEventListeners();
    }

    function handleSubmitClick(e) {
        e.preventDefault();
        tasksArray[index].taskName = name.value;
        tasksArray[index].dueDate = formatDateDayFirst(dueDate.value);
        tasksArray[index].priority = priority.value;
        tasksArray[index].description = description.value;
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
        console.log('successfully edited');
        displayTasks();
        editTaskDialog.close();
        removeEventListeners();
    }

    function removeEventListeners() {
        cancelButton.removeEventListener('click', handleCancelClick);
        submitButton.removeEventListener('click', handleSubmitClick);
    }
    editTaskDialog.showModal();
}

function formatDateYearFirst(date) {
    let year = date.slice(-4);
    let month = date.slice(3,5);
    let day = date.slice(0, 2);
    return `${year}-${month}-${day}`;
}

function formatDateDayFirst(date) {
    const day = date.slice(-2); // take last 2 digits
    const month = date.slice(5,7);
    const year = date.slice(0,4);
    return `${day}-${month}-${year}`;
}