import "./reset.css";
import "./styles.css";

import { displayTasks } from "./display/display-tasks";
import { displayProjects } from "./display/display-projects";
import { displayProjectTasks } from "./display/display-project-tasks";

let tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        if(tab.dataset.onThisTab == "false") {
            let notOnThisTab = document.querySelector('.tab[data-on-this-tab="true"]');
            notOnThisTab.dataset.onThisTab = "false";
            tab.dataset.onThisTab = "true";

            if (tab.classList.contains('tasks')) {
                displayTasks();
            } else {
                displayProjects();
            }
        }
    } )
})
class Task {
    constructor(taskName, dueDate, priority, description) {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }
}

class Project {
    constructor(name, dueDate, priority, description) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.tasks = []
    }
}
let tasks;
let projects = [];

if (retrieveTasks() !== null) {
    console.log('tasks already exists');
    displayTasks();
} else {
    tasks = [];
    let defaultTask = new Task('Sleep', '01-01-2000', 'low', 'must do');
    tasks.push(defaultTask);
    localStorage.setItem('tasksArray', JSON.stringify(tasks));
    displayTasks();
    console.log('new task auto-created');
}

function retrieveTasks() {
    let unparsedTasks = localStorage.getItem('tasksArray');
    let ta = JSON.parse(unparsedTasks);
    return ta;
}

if (localStorage.getItem('projectsArray') == null) {
    let newProject = new Project('hello project', '02-02-2024', 'low', 'no description');
    projects.push(newProject);
    localStorage.setItem('projectsArray', JSON.stringify(projects));
    console.log('new project auto-created');
}

export function addTaskToProject(projectNum, taskName, dueDate, priority, description) {
    let pro = JSON.parse(localStorage.getItem('projectsArray'));//get projects from local storage
    let projectToAddTask = pro[projectNum];// 0-base indexed project num
    let newTask = new Task(taskName, dueDate, priority, description);
    projectToAddTask.tasks.push(newTask);
    pro[projectNum] = projectToAddTask;
    writeProjectsToStorage(pro);
    displayProjectTasks(projectNum);
}

export function addTask(taskName, dueDate, priority, description) {
    let ta = JSON.parse(localStorage.getItem('tasksArray'));
    let newTask = new Task(taskName.trim(), dueDate,priority, description);
    ta.push(newTask);
    writeTasksToStorage(ta);
    displayTasks();
}

export function deleteTask(taskNum) {//taskNum is 0-based index
    let ta = JSON.parse(localStorage.getItem('tasksArray'));
    let removedTask = ta.splice((taskNum), 1);
    console.log(removedTask);
    writeTasksToStorage(ta);
    displayTasks();
}

export function deleteProject(projectNum) {//ProjectNum is 0-based index
    let pro = JSON.parse(localStorage.getItem('projectsArray'));
    let removedPro = pro.splice((projectNum), 1);
    console.log(removedPro);
    writeProjectsToStorage(pro);
    displayProjects();
}

function writeTasksToStorage(ta) {
    localStorage.setItem('tasksArray', JSON.stringify(ta));
}

function writeProjectsToStorage(p) {
    localStorage.setItem('projectsArray', JSON.stringify(p));
}

export function formatDateYearFirst(date) {
    let year = date.slice(-4);
    let month = date.slice(3,5);
    let day = date.slice(0, 2);
    return `${year}-${month}-${day}`;
}

export function formatDateDayFirst(date) {
    const day = date.slice(-2); // take last 2 digits
    const month = date.slice(5,7);
    const year = date.slice(0,4);
    return `${day}-${month}-${year}`;
}

export function addProject(projectName, dueDate, priority, description) {
    let newProject = new Project(projectName, dueDate, priority, description);
    let pro = JSON.parse(localStorage.getItem('projectsArray'));
    pro.push(newProject);
    writeProjectsToStorage(pro);
    displayProjects();
}

export function deleteProjectTask(projectIndex, taskIndex) {// project related, indexes are 0-based
    let projects = JSON.parse(localStorage.getItem('projectsArray'));
    let taskProject = projects[projectIndex];
    taskProject.tasks.splice((taskIndex), 1);
    projects[projectIndex] = taskProject;
    writeProjectsToStorage(projects);
    displayProjectTasks(projectIndex);
}

