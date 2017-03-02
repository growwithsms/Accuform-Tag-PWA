//@prepros-prepend vendor/jquery-3.1.1.min.js

//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js
//@prepros-prepend vendor/textfield.js
//@prepros-prepend vendor/flickity.pkgd.min.js
//@prepros-prepend vendor/js.cookie.js

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
|--------------------------------------|
| Database - see dexie.js @ dexie.org |
|------------------------------------|
*/

// Define the database
var db = new Dexie('quote_database');
db.version(1).stores({
    users: 'name,email',
    endUsers: 'company,name,email',
    quotes: 'material,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
});

// Register User
if (Cookies.get('user') != 'registered') {
    $('.login form').on('submit', function(e) {

        e.preventDefault();

        var userName = document.getElementById('user-name').value,
            userEmail = document.getElementById('user-email').value;

        db.users.put({ name: userName, email: userEmail }).catch(function(error) {
            alert("Ooops: " + error);
        }).then(function() {
            Cookies.set('user', 'registered');
            $('body').addClass('userRegistered');
        });

        return false;
    });
} else {
    $('body').addClass('userRegistered');
}


// Quote Carousel
$('.quote-carousel').flickity({
    prevNextButtons: false,
    imagesLoaded: true
});
