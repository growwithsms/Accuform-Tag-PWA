//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js

// Tag Model Form
var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');

if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

showModalButton.addEventListener('click', function() {
    dialog.showModal();
});

dialog.querySelector('.save').addEventListener('click', function() {
	dialog.close();
});