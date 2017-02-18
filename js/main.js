//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js

/*
|----------------------------|
| PWA Service Worker         |
|----------------------------|
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


/*
|----------------------------|
|  Form Fields 		 |
|----------------------------|
*/

var yourName = document.querySelector('#user-name'),
    yourEmail = document.querySelector('#user-email'),
    distributorName = document.querySelector('#distributor-name'),
    distributorContact = document.querySelector('#distributor-contact'),
    distributorEmail = document.querySelector('#distributor-email'),
    endUserName = document.querySelector('#end-user-name'),
    endUserContact = document.querySelector('#end-user-contact'),
    endUserEmail = document.querySelector('#end-user-email');
    tagName = document.querySelector('#tag-name'),
    tagMaterial = document.querySelector('#tag-material'),
    tagHeight = document.querySelector('#tag-height'),
    tagWidth = document.querySelector('#tag-width'),
    tagUnitOfMeasure = $('input[name="tag-size-unit"]:checked'),
    tagOrderQuantity = document.querySelector('#tag-quantity'),
    tagAnnualUsage = document.querySelector('#tag-usage'),
    tagImageFront = document.querySelector('#tag-image-front'),
    tagImageBack = document.querySelector('#tag-image-back'),
    tagFinishing = document.querySelector('#tag-finishing'),
    tagNotes = document.querySelector('#tag-notes');

/*
|----------------------------|
| Tabs - Continue Buttons 	 |
|----------------------------|
*/

var distributorNextButton = document.querySelector('.next-tab[href="#distributor"]'),
    userNextButton = document.querySelector('.next-tab[href="#end-user"]'),
    tagsNextButton = document.querySelector('.next-tab[href="#tag"]'),
    tabs = $(".mdl-layout__tab"),
    distributorTab = document.querySelector('.mdl-layout__tab[href="#distributor"]'),
    userTab = document.querySelector('.mdl-layout__tab[href="#end-user"]'),
    tagsTab = document.querySelector('.mdl-layout__tab[href="#tags"]'),
    tabPanels = $(".mdl-layout__tab-panel"),
    distributorTabPanel = document.querySelector('#distributor'),
    userTabPanel = document.querySelector('#end-user'),
    tagsTabPanel = document.querySelector('#tag');

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

// var db = new Dexie('quotes');

// // Define a schema
// db.version(1).stores({
//     you: 'yourName, yourEmail',
//     distributor: 'distributor, distributorName, distributorEmail',
//     endUser: 'endUser, endUserName, endUserEmail',
//     tags: 'tagName, tagMaterial, tagHeight, tagWidth, tagUnitOfMeasure, tagOrderQuantity, tagAnnualUsage, tagFrontImage, tagBackImage, tagFinishing, tagNotes'
// });

// // Open the database
// db.open().catch(function(error) {
//     alert('Uh oh : ' + error);
// });

// if (!dialog.showModal) {
//     dialogPolyfill.registerDialog(dialog);
// }

/*
|----------------------------|
| Submit Quote 				 |
|----------------------------|
*/
r(function(){
  'use strict';
	var snackbarContainer = document.querySelector('#toast-message');
	var submitQuote = document.querySelector('.submit-quote');
	submitQuote.addEventListener('click', function() {
		'use strict';
	    var data = { message: 'Quote Sent to Accuform Sales!' };
	    snackbarContainer.MaterialSnackbar.showSnackbar(data);
	});
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}