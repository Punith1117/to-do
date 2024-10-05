export function createDeleteDialog() {
    let deleteDialog = document.createElement('dialog');
    deleteDialog.classList.add('delete-dialog');
        let query = document.createElement('div');
        query.classList.add('query');

        let buttonsDiv = document.createElement('div');
            let noButton = document.createElement('button');
            noButton.classList.add('no');
            noButton.textContent = 'No';
            let yesButton = document.createElement('button');
            yesButton.classList.add('yes');
            yesButton.textContent = 'Yes';
        buttonsDiv.appendChild(noButton);
        buttonsDiv.appendChild(yesButton);

    deleteDialog.appendChild(query);
    deleteDialog.appendChild(buttonsDiv);

    return deleteDialog;
}