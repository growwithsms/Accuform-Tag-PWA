//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js
//@prepros-prepend vendor/textfield.js

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

var userNextButton = document.querySelector('.next-tab[href="#end-user"]'),
    tagNextButton = document.querySelector('.next-tab[href="#tag"]'),
    tabs = $(".mdl-layout__tab"),
    userTab = document.querySelector('.mdl-layout__tab[href="#end-user"]'),
    tagTab = document.querySelector('.mdl-layout__tab[href="#tag"]'),
    tabPanels = $(".mdl-layout__tab-panel"),
    userTabPanel = document.querySelector('#end-user'),
    tagTabPanel = document.querySelector('#tag');

// Continue to User
userNextButton.addEventListener("click", function() {
    tabs.removeClass("is-active");
    tabPanels.removeClass("is-active");
    userTab.classList.add("is-active");
    userTabPanel.classList.add("is-active");
});

// Continue to Tag
tagNextButton.addEventListener("click", function() {
    tabs.removeClass("is-active");
    tabPanels.removeClass("is-active");
    tagTab.classList.add("is-active");
    tagTabPanel.classList.add("is-active");
});


/*
|--------------------------------------|
| Database - see dexie.js @ dexie.org |
|------------------------------------|
*/

// Define the database
var db = new Dexie('quote_database');
// Define a schema
db.version(1).stores({
    users: 'yourName,yourEmail',
    distributors: 'distributor,distributorName,distributorEmail',
    endUsers: 'endUser,endUserName,endUserEmail',
    tags: 'tagName,tagMaterial,tagHeight,tagWidth,tagUnitOfMeasure,tagOrderQuantity,tagAnnualUsage,tagFrontImage,tagBackImage,tagFinishing,tagNotes'
});


$('.login form').on('submit', function(e){
    e.preventDefault();

    var userName  = yourName.value,
        userEmail = yourEmail.value;

    db.users.put({yourName: userName, yourEmail: userEmail}).catch(function(error) {
        alert ("Ooops: " + error);
    });

    $('body').addClass('userRegistered');

    return false;

});



/*
|----------------------------|
| Submit Quote 				 |
|----------------------------|
*/
