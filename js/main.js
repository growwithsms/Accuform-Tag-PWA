//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js

// Next Buttons
var distributorNextButton 	= document.querySelector('.next-tab[href="#distributor"]'),
	userNextButton 			= document.querySelector('.next-tab[href="#end-user"]'),
	tagsNextButton 			= document.querySelector('.next-tab[href="#tags"]'),
	
	tabs 					= $(".mdl-layout__tab"),
	distributorTab			= document.querySelector('.mdl-layout__tab[href="#distributor"]'),
	userTab					= document.querySelector('.mdl-layout__tab[href="#end-user"]'),
	tagsTab					= document.querySelector('.mdl-layout__tab[href="#tags"]'),

	tabPanels				= $(".mdl-layout__tab-panel"),
	distributorTabPanel		= document.querySelector('#distributor'),
	userTabPanel			= document.querySelector('#end-user'),
	tagsTabPanel			= document.querySelector('#tags');

distributorNextButton.addEventListener("click", function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	distributorTab.classList.add("is-active");
	distributorTabPanel.classList.add("is-active");
});
userNextButton.addEventListener("click", function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	userTab.classList.add("is-active");
	userTabPanel.classList.add("is-active");
});
tagsNextButton.addEventListener("click", function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	tagsTab.classList.add("is-active");
	tagsTabPanel.classList.add("is-active");
});

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