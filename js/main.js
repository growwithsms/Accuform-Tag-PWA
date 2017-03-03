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
|----------------------------|
| Database                   |
|----------------------------|
*/
// Define the database
var db = new Dexie('quote_database');
db.version(1).stores({
    users: 'name,email',
    endUsers: 'company,name,email',
    quotes: 'material,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
});


/*
|----------------------------|
| Profile Login              |
|----------------------------|
*/

// Register User
if (Cookies.get('user') != 'registered') {
    $('.login').show();
    $('.login form').on('submit', function(e) {
        e.preventDefault();

        var userName = document.getElementById('user-name').value,
            userEmail = document.getElementById('user-email').value;

        db.users.put({ name: userName, email: userEmail }).catch(function(error) {
            alert("Ooops: " + error);
        }).then(function() {
            Cookies.set('user', 'registered');
            $('body').addClass('userRegistered');
        }).then(function() {
            $('.login').addClass('fadeOut');
        });

        return false;
    });
} else {
    $('body').addClass('userRegistered');
}


/*
|----------------------------|
| Quotes Page                |
|----------------------------|
*/

// Quote Carousel
$('.quote-carousel').flickity({
    prevNextButtons: false,
    imagesLoaded: true,
    setGallerySize: false
});

// Dynamic Product Labels
$('input[name="productType"]').on('change', function(){
    var productTypeText = $(this).val();
    $('span[data-dynamic="product"').text(productTypeText);
});

// Dynamic Carousel - waiting on brad's response


// Photo input animations
$('#photoFront').on('change', function() {
    $(this).next().addClass('uploaded');
});
$('#photoBack').on('change', function() {
    $(this).next().addClass('uploaded');
});

// Submit form
$('.quote-form').on('submit', function(e) {
    e.preventDefault();
    
    $('body').removeClass('quote-sent');
    
    var loading = $('.mdl-spinner');
    loading.addClass('is-active');

    var dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    var url = '/mailer/mail.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: $('.quote-form').serialize(), // serializes the form's elements.
        success: function(data) {
            loading.removeClass('is-active');
            $('body').addClass('quote-sent');
        }
    });

    return false;
});
