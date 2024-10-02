import { handleProjectEdit } from "./project-edit";

console.log('#press a/A to add a task');
console.log('#press d/D to delete a task');
console.log('#press e/E to edit a task');
console.log('#press p to add a task to a project');
console.log('#press shift and p to add a project');
console.log('#press shift and d to delete smtg in project');
console.log('#press shift and e to edit smtg in project');
class Task {
    constructor(taskName, dueDate, description) {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.description = description;
    }
}

class Project {
    constructor(name, dueDate, description) {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.tasks = []
    }
}
let tasks;
let projects = [];

function retrieveTasks() {
    let unparsedTasks = localStorage.getItem('tasksArray');
    let ta = JSON.parse(unparsedTasks);
    return ta;
}

if (localStorage.getItem('projectsArray') == null) {
    let newProject = new Project('hello project', '02-02-2024', 'no description');
    projects.push(newProject);
    localStorage.setItem('projectsArray', JSON.stringify(projects));
    displayProjects();
} else {
    displayProjects();
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
    if (event.shiftKey && event.key.toLowerCase() == 'p') {
        let projectName, dueDate, description;
        console.log('p and shift pressed');
        [projectName, dueDate, description] = inputProject();
        addProject(projectName, dueDate, description);
        return;
    } else if (event.key.toLowerCase() == 'p') {
        let projectNum;
        do {
            projectNum = prompt('Enter project num to add task:');
        } while ((isNaN(projectNum)) || (validProjectNum(parseInt(projectNum)) == false));
        let taskName, dueDate, description;
        [taskName, dueDate, description] = inputTask();
        addTaskToProject(projectNum, taskName, dueDate, description);
        return;
    } else if (event.shiftKey && event.key.toLowerCase() == 'd') {
        let validInputs = ['p', 't'];
        let userInput;
        do {
            userInput = prompt('What do you want to delete?-p-roject or a -t-ask?');
        } while (!validInputs.includes(userInput));
        if (userInput == 'p') {
            handleDeleteProject();
        } else {
            handleDeleteTask();
        }
        return;
    } else if (event.shiftKey && event.key.toLowerCase() == 'e') {
        let projectNum;
        do {
            projectNum = prompt('Enter the project number to edit:');
        } while ((isNaN(projectNum)) || (validProjectNum(parseInt(projectNum)) == false));
        handleProjectEdit(projectNum);
        displayProjects();
        return;
    }
    switch(event.key.toLowerCase()) {
        case 'a':
            let taskName, dueDate, description;
            [taskName, dueDate, description] = inputTask();
            addTask(taskName, dueDate, description);
            displayTasks();
            break;
        case 'd':
            let zeroTaskCheck = retrieveTasks();
            if (zeroTaskCheck.length == 0) {
                console.log('nothing to delete');
                return;
            }
            let delTaskNum;
            do {
                delTaskNum = prompt('Enter task num to delete:');
            } while ((isNaN(delTaskNum)) || (validTaskNum(parseInt(delTaskNum)) == false));
            deleteTask(delTaskNum);
            break;
        case 'e':
            handleTaskEdit();
            break;
        }
})

function addTaskToProject(projectNum, taskName, dueDate, description) {
    let pro = JSON.parse(localStorage.getItem('projectsArray'));
    let projectToAddTask = pro[projectNum-1];
    let newTask = new Task(taskName, dueDate, description);
    projectToAddTask.tasks.push(newTask);
    pro[projectNum-1] = projectToAddTask;
    writeProjectsToStorage(pro);
    displayProjects();
}

function addTask(taskName, dueDate, description) {
    let ta = JSON.parse(localStorage.getItem('tasksArray'));
    let newTask = new Task(taskName.trim(), dueDate, description);
    ta.push(newTask);
    writeTasksToStorage(ta);
}

function deleteTask(taskNum) {
    let ta = JSON.parse(localStorage.getItem('tasksArray'));
    let removedTask = ta.splice((taskNum-1), 1);
    console.log(removedTask);
    writeTasksToStorage(ta);
    displayTasks();
}

function handleTaskEdit() {//simple tasks related
    let zeroTaskCheck = retrieveTasks();
    if (zeroTaskCheck.length == 0) {
        console.log('nothing to edit');
        return;
    }
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
    let ta = JSON.parse(localStorage.getItem('tasksArray'));
    switch(key) {
        case 'n':
        case 'N':
            do {
                newTaskName = prompt('Enter Name:-');
            } while (newTaskName === null || newTaskName.trim() === '');
            taskToEdit = ta[editTaskNum-1];
            taskToEdit.taskName = newTaskName;
            ta[editTaskNum-1] = taskToEdit;
            writeTasksToStorage(ta);
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
            taskToEdit = ta[editTaskNum-1];
            taskToEdit.dueDate = newDueDate;
            ta[editTaskNum-1] = taskToEdit;
            writeTasksToStorage(ta);
            console.log('successfully edited');
            displayTasks();
            break;
        case 'de':
        case 'DE':
            let newDescription = prompt('description:-');
            taskToEdit = ta[editTaskNum-1];
            taskToEdit.description = newDescription;
            ta[editTaskNum-1] = taskToEdit;
            writeTasksToStorage(ta);
            console.log('successfully edited');
            displayTasks();
            break;
    }
}

function writeTasksToStorage(ta) {
    localStorage.setItem('tasksArray', JSON.stringify(ta));
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

function inputProject() {
    let projectName;
    do {
        projectName = prompt('Enter Project Name:-');
    } while (projectName === null || projectName.trim() === '');
    console.log(projectName);
    let dueDate;
    let dueDateRegex = /^((0|1|2)[0-9]|30|31)-(0[1-9]|1[0-2])-[2][0][0-9][0-9]$/
    do {
        dueDate = prompt('Enter date(DD-MM-YYY)');
    } while(dueDateRegex.test(dueDate) == false)
    console.log(dueDate);
    let description = prompt('description:-');
    console.log(description);
    return [projectName, dueDate, description];
}

function addProject(projectName, dueDate, description) {
    let newProject = new Project(projectName, dueDate, description);
    let pro = JSON.parse(localStorage.getItem('projectsArray'));
    pro.push(newProject);
    writeProjectsToStorage(pro);
    displayProjects();
}

function handleDeleteProject() {
    let projectNum;
    do {
        projectNum = prompt('Enter project num to delete:');   
    } while ((isNaN(projectNum)) || (validProjectNum(parseInt(projectNum)) == false));
    let pro = JSON.parse(localStorage.getItem('projectsArray'))
    let confirmDelete = prompt('Are you sure you want to delete ' + pro[projectNum-1].name + ' Enter y for yes');
    if (confirmDelete == 'y') {
        let removedProject = pro.splice((projectNum-1), 1);
        console.log('Deleted Project:');
        console.log(removedProject);
        console.log('Updated Project list:');
        writeProjectsToStorage(pro);
        displayProjects();
    } else {
        console.log('delete aborted');
    }
}

function handleDeleteTask() {// project related
    let projectNum;
    do {
        projectNum = prompt('Enter project num of the task:');   
    } while ((isNaN(projectNum)) || (validProjectNum(parseInt(projectNum)) == false));
    let pro = JSON.parse(localStorage.getItem('projectsArray'));
    let taskProject = pro[projectNum-1];
    let taskNum;
    do {
        taskNum = prompt('Enter valid task num:');
    } while((isNaN(taskNum)) || ((taskNum > taskProject.tasks.length) && (taskNum < 1)));
    let confirmDelete = prompt('Are you sure you want to delete ' + taskProject.tasks[taskNum-1].taskName + ' Enter y for yes');
    if (confirmDelete == 'y') {
        taskProject.tasks.splice((taskNum-1), 1);
        pro[projectNum-1] = taskProject;
        writeProjectsToStorage(pro);
        displayProjects();
    } else {
        console.log('delete aborted');
    }
}

function writeProjectsToStorage(p) {
    localStorage.setItem('projectsArray', JSON.stringify(p));
}

function displayTasks() {
    tasks = retrieveTasks();
    console.log('Num of tasks: ' + tasks.length);
    console.log('Tasks:')
    tasks.forEach((task) => {
        console.log('Name: ' + task.taskName + ' __ ' + 'Due date: ' + task.dueDate + '__' + 'Description: ' + task.description);
    })
}

function displayProjects() {
    let projectsArray = JSON.parse(localStorage.getItem('projectsArray'));
    projectsArray.forEach(project => {
        console.log(project);
    })
    console.log('Num of projects: ' + projectsArray.length);
}

function validTaskNum(num) {
    let ta = JSON.parse(localStorage.getItem('tasksArray'));//get tasks array from storage
    if ((num <= ta.length) && (num >= 1)) {
        return true;
    } else {
        console.log('invalid task num');
        return false;
    }
}

function validProjectNum(num) {
    let proj = JSON.parse(localStorage.getItem('projectsArray'));//get projects array from storage
    if ((num <= proj.length) && (num >= 1)) {
        return true;
    } else {
        console.log('invalid project num');
        return false;
    }
}