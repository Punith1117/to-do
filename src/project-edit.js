export function handleProjectEdit(projectNum) {
    let projects = JSON.parse(localStorage.getItem('projectsArray'));

    let validInputs = ['n', 'du', 'de', 't'];
    let userInput;
    do {
        userInput = prompt('Edit Name, Due date, Description, Tasks? Valid inputs: n, du, de, t .')
    } while (validInputs.includes(userInput.toLowerCase()) == false);

    console.log(userInput);
    switch(userInput) {
        case 'n':
            let newName;
            do {
                newName = prompt('Enter new name:');
            } while ((newName == null) || (newName.trim() == ''))
            console.log(newName);
            projects[projectNum-1].name = newName;
            break;
        
        case 'du':
            let newDate;
            let dueDateRegex = /^((0|1|2)[0-9]|30|31)-(0[1-9]|1[0-2])-[2][0][0-9][0-9]$/
            do {
                newDate = prompt('Enter new date:');
            } while (dueDateRegex.test(newDate) == false);
            projects[projectNum-1].dueDate = newDate;
            break;

        case 'de':
            let newDescription = prompt('Enter new description:');
            projects[projectNum-1].description = newDescription;
            break;

        case 't':
            projects[projectNum-1].tasks = handleTaskEdit(projects[projectNum-1].tasks);
            break;
    }
    localStorage.setItem('projectsArray', JSON.stringify(projects));
    console.log(projectNum + 'st/nd/rd/th project has been successfully edited');
}

function handleTaskEdit(tasksArray) {
    let taskNumToEdit;
    do {
        taskNumToEdit = prompt('Which task to edit?');
    } while (taskNumToEdit < 1 || taskNumToEdit > tasksArray.length);
    console.log(taskNumToEdit);
    let key;
    let keys = ['n','du','de'];
    do {
        key = prompt('Enter which field to edit:-(name[n]|due date[du]|description[de])');
    } while (!keys.includes(key.toLowerCase()));
    let newTaskName;
    switch(key) {
        case 'n':
            do {
                newTaskName = prompt('Enter Name:-');
            } while (newTaskName === null || newTaskName.trim() === '');
            tasksArray[taskNumToEdit-1].taskName = newTaskName;
            break;
        case 'du':
            let newDueDate;
            let dueDateRegex = /^((0|1|2)[0-9]|30|31)-(0[1-9]|1[0-2])-[2][0][0-9][0-9]$/
            do {
                newDueDate = prompt('Enter date(DD-MM-YYY)');
            } while(dueDateRegex.test(newDueDate) == false);
            tasksArray[taskNumToEdit-1].dueDate = newDueDate;
            break;
        case 'de':
            let newDescription = prompt('description:-');
            tasksArray[taskNumToEdit-1].description = newDescription;
            break;
    }
    return tasksArray;
}