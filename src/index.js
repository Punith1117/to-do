import { sayHello } from "./module";
sayHello();

console.log('#press a/A to add a task');
console.log('#press d/D to delete a task');
console.log('#press e/E to edit a task');
class Task {
    constructor(taskName, dueDate, description) {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.description = description;
    }
}

let tasks;

function retrieveTasks() {
    let unparsedTasks = localStorage.getItem('tasksArray');
    tasks = JSON.parse(unparsedTasks);
    return tasks;
}

if (retrieveTasks() !== null) {
    console.log('tasks already exists');
    displayTasks();
} else {
    tasks = [];
    let defaultTask = new Task('Sleep', '01-01-2000', 'must do');
    tasks.push(defaultTask);
    localStorage.setItem('tasksArray', JSON.stringify(tasks));
    displayTasks();
    console.log('new task auto-created');
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'a':
        case 'A':
            let taskName, dueDate, description;
            [taskName, dueDate, description] = inputTask();
            addTask(taskName, dueDate, description);
            displayTasks();
            break;
        case 'D':
        case 'd':
            let delTaskNum;
            do {
                delTaskNum = prompt('Enter task num to delete:');
            } while ((isNaN(delTaskNum)) || (validTaskNum(parseInt(delTaskNum)) == false));
            deleteTask(delTaskNum);
            break;
        case 'e':
        case 'E':
            handleEdit();
            break;
        }
})

function validTaskNum(num) {
    if ((num <= tasks.length) && (num >= 1)) {
        return true;
    } else {
        console.log('invalid task num');
        return false;
    }
}

function inputTask() {
    let taskName;
    do {
        taskName = prompt('Enter Name:-');
    } while (taskName === null || taskName.trim() === '');
    console.log(taskName);
    let dueDate;
    let dueDateRegex = /^((0|1|2)[0-9]|30|31)-(0[1-9]|1[0-2])-[2][0][0-9][0-9]$/
    do {
        dueDate = prompt('Enter date(DD-MM-YYY)');
    } while(dueDateRegex.test(dueDate) == false)
    console.log(dueDate);
    let description = prompt('description:-');
    console.log(description);
    return [taskName, dueDate, description];
}

function addTask(taskName, dueDate, description) {
    let newTask = new Task(taskName.trim(), dueDate, description);
    tasks.push(newTask);
    writeTasksToStorage();
}

function displayTasks() {
    tasks = retrieveTasks();
    console.log('Num of tasks: ' + tasks.length);
    tasks.forEach((task) => {
        console.log('Name: ' + task.taskName + ' __ ' + 'Due date: ' + task.dueDate + '__' + 'Description: ' + task.description);
    })
}

function deleteTask(taskNum) {
    let removedTask = tasks.splice((taskNum-1), 1);
    console.log(removedTask);
    writeTasksToStorage();
    displayTasks();
}

function handleEdit() {
    let editTaskNum;
    do {
        editTaskNum = prompt('Enter task num to edit:');
    } while ((isNaN(editTaskNum)) || (validTaskNum(parseInt(editTaskNum)) == false));
    let key;
    let keys = ['n','N','du','DU','de','DE'];
    do {
        key = prompt('Enter which field to edit:-(name[n]|due date[du]|description[de])');
    } while (!keys.includes(key));
    let newTaskName;
    let taskToEdit;
    switch(key) {
        case 'n':
        case 'N':
            do {
                newTaskName = prompt('Enter Name:-');
            } while (newTaskName === null || newTaskName.trim() === '');
            taskToEdit = tasks[editTaskNum-1];
            taskToEdit.taskName = newTaskName;
            tasks[editTaskNum-1] = taskToEdit;
            writeTasksToStorage();
            console.log('successfully edited');
            displayTasks();
            break;
        case 'du':
        case 'DU':
            let newDueDate;
            let dueDateRegex = /^((0|1|2)[0-9]|30|31)-(0[1-9]|1[0-2])-[2][0][0-9][0-9]$/
            do {
                newDueDate = prompt('Enter date(DD-MM-YYY)');
            } while(dueDateRegex.test(newDueDate) == false);
            taskToEdit = tasks[editTaskNum-1];
            taskToEdit.dueDate = newDueDate;
            tasks[editTaskNum-1] = taskToEdit;
            writeTasksToStorage();
            console.log('successfully edited');
            displayTasks();
            break;
        case 'de':
        case 'DE':
            let newDescription = prompt('description:-');
            taskToEdit = tasks[editTaskNum-1];
            taskToEdit.description = newDescription;
            tasks[editTaskNum-1] = taskToEdit;
            writeTasksToStorage();
            console.log('successfully edited');
            displayTasks();
            break;
    }
}

function writeTasksToStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(tasks));
}