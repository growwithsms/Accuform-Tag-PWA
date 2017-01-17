//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js


/*
|----------------------------|
| Contact Form Fields 		 |
|----------------------------|
*/

var yourName				= document.querySelector('#user-name'),
	yourEmail				= document.querySelector('#user-email'),
	distributorName			= document.querySelector('#distributor-name'),
	distributorContact		= document.querySelector('#distributor-contact'),
	distributorEmail		= document.querySelector('#distributor-email'),
	endUserName				= document.querySelector('#end-user-name'),
	endUserContact			= document.querySelector('#end-user-contact'),
	endUserEmail			= document.querySelector('#end-user-email');

/*
|----------------------------|
| Tabs - Continue Buttons 	 |
|----------------------------|
*/

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

// Continue to Distributor
distributorNextButton.addEventListener("click", 
	function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	distributorTab.classList.add("is-active");
	distributorTabPanel.classList.add("is-active");
});

// Continue to User
userNextButton.addEventListener("click", function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	userTab.classList.add("is-active");
	userTabPanel.classList.add("is-active");
});

// Continue to Tags
tagsNextButton.addEventListener("click", function() {
	tabs.removeClass("is-active");
	tabPanels.removeClass("is-active");
	tagsTab.classList.add("is-active");
	tagsTabPanel.classList.add("is-active");
});


/*
|----------------------------|
| Quote Database for History |
|----------------------------|
*/

var db = new Dexie('quotes');

// Define a schema
db.version(1).stores({
	you: 			'yourName, yourEmail',
	distributor: 	'distributor, distributorName, distributorEmail',
	endUser: 		'endUser, endUserName, endUserEmail',
	tags: 			'tagName, tagMaterial, tagHeight, tagWidth, tagUnitOfMeasure, tagOrderQuantity, tagAnnualUsage, tagFrontImage, tagBackImage, tagFinishing, tagNotes'
});

// Open the database
db.open().catch(function(error) {
	alert('Uh oh : ' + error);
});

/*
|----------------------------|
| Tag Model Window			 |
|----------------------------|
*/

var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.add-tag');

if (!dialog.showModal) {
     dialogPolyfill.registerDialog(dialog);
}

// Open Dialog Window
showModalButton.addEventListener('click', function() {
    dialog.showModal();
});

// Save Tag
dialog.querySelector('.save-tag').addEventListener('click', function() {

	// Get input values
    var tagName 			= document.querySelector('#tag-name'),
		tagMaterial 		= document.querySelector('#tag-material'),
		tagHeight			= document.querySelector('#tag-height'),
		tagWidth			= document.querySelector('#tag-width'),
		tagUnitOfMeasure 	= $('input[name="tag-size-unit"]:checked'),
		tagOrderQuantity 	= document.querySelector('#tag-quantity'),
		tagAnnualUsage 		= document.querySelector('#tag-usage'),
		tagImageFront		= document.querySelector('#tag-image-front'),
		tagImageBack		= document.querySelector('#tag-image-back'),
		tagFinishing		= document.querySelector('#tag-finishing'),
		tagNotes 			= document.querySelector('#tag-notes');

	// Add values to database
	db.tags.add({
		tagName: tagName.value,
		tagMaterial: tagMaterial.value,
		tagHeight: tagHeight.value,
		tagWidth: tagWidth.value,
		tagUnitOfMeasure: tagUnitOfMeasure.value,
		tagOrderQuantity: tagOrderQuantity.value,
		tagAnnualUsage: tagAnnualUsage.value,
		tagFrontImage: tagImageFront.value,
		tagBackImage: tagImageBack.value,
		tagFinishing: tagFinishing.value,
		tagNotes: tagNotes.value
	});

	// Output Chip to DOM
	$('.tags-wrapper').append('<span class="mdl-chip mdl-chip--deletable tag"><span class="mdl-chip__text">' + tagName.value + '</span><button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button></span>');

	// Reset fields for future tags
	$('dialog').find('input, textarea').val('');
	$('dialog').find('select').find('option:eq(0)').prop('selected', true);

	// Close dialog
	dialog.close();

});

// Edit or Delete a Tag
