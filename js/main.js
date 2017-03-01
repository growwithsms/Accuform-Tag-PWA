//@prepros-prepend vendor/jquery-3.1.1.min.js
//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js
//@prepros-prepend vendor/textfield.js
//@prepros-prepend vendor/flickity.pkgd.min.js

/*
|----------------------------|
| PWA Service Worker         |
|----------------------------|
*/
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }).catch(function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

/*
|--------------------------------------|
| Database - see dexie.js @ dexie.org |
|------------------------------------|
*/

Define the database
var db = new Dexie('quote_database');
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


$('.quote-carousel').flickity({
	prevNextButtons: false
});
