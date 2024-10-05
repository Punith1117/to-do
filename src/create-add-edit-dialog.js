export function createAddDialog() {//can also be used as edit dialog

    let addDialog = document.createElement('dialog');
    addDialog.classList.add('add-dialog');
    
    let heading = document.createElement('div');
    heading.textContent = 'Enter details:';
    addDialog.appendChild(heading);

    let form = document.createElement('form');
        let nameSection = document.createElement('section');
        nameSection.classList.add('name-section');
            let nameLabel = document.createElement('label');
            nameLabel.textContent = 'Name:';
            nameLabel.setAttribute('for', 'name-input');
            let nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.classList.add('name-input');
            nameInput.id = 'name-input';
            nameInput.required = true;
        nameSection.appendChild(nameLabel);
        nameSection.appendChild(nameInput);

        let dateSection = document.createElement('section');
        dateSection.classList.add('date-section');
            let dateLabel = document.createElement('label');
            dateLabel.textContent = 'Due Date: ';
            dateLabel.setAttribute('for', 'date-input');
            let dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.classList.add('date-input');
            dateInput.id = 'date-input';
            dateInput.required = true;
        dateSection.appendChild(dateLabel);
        dateSection.appendChild(dateInput);

        let prioritySection = document.createElement('div');
        prioritySection.classList.add('priority-section');
            let priorityLabel = document.createElement('label');
            priorityLabel.setAttribute('for', 'options');
            priorityLabel.textContent = 'Priority:'
            let priorityOptions = document.createElement('select');
            priorityOptions.id = 'options';
                let highOption = document.createElement('option');
                highOption.value = 'high';
                highOption.textContent = 'high';

                let lowOption = document.createElement('option');
                lowOption.value = 'low';
                lowOption.textContent = 'low';
                lowOption.selected = true;
            priorityOptions.appendChild(highOption);
            priorityOptions.appendChild(lowOption);
        prioritySection.appendChild(priorityLabel);
        prioritySection.appendChild(priorityOptions);

        let descriptionSection = document.createElement('section');
        descriptionSection.classList.add('description-section');
            let descriptionLabel = document.createElement('label');
            descriptionLabel.textContent = 'Description: ';
            descriptionLabel.setAttribute('for', 'description-input');
            let descriptionInput = document.createElement('input');
            descriptionInput.type = 'text';
            descriptionInput.classList.add('description-input');
            descriptionInput.id = 'description-input';
        descriptionSection.appendChild(descriptionLabel);
        descriptionSection.appendChild(descriptionInput);

        let buttonsSection = document.createElement('section');
        buttonsSection.classList.add('buttons-section');
            let cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('cancel');
            let submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Submit';
            submitButton.classList.add('submit');
        buttonsSection.appendChild(cancelButton);
        buttonsSection.appendChild(submitButton);

    form.appendChild(nameSection);
    form.appendChild(dateSection);
    form.appendChild(prioritySection);
    form.appendChild(descriptionSection);
    form.appendChild(buttonsSection);

    addDialog.appendChild(form);

    return addDialog;
}