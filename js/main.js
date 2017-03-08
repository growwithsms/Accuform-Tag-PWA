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
var $carousel = $('.quote-carousel').flickity({
    prevNextButtons: false
});
var isFlickity = true;

var $tagQuoteTemplate = $('#tag-quote').html().trim(),
    $labelQuoteTemplate = $('#label-quote').html().trim(),
    $signQuoteTemplate = $('#sign-quote').html().trim();

// Product Type quote logic
$('input[name="productType"]').on('change', function() {

    // change text to selected product name in carousel
    var productType = $(this).val();
    $('span[data-dynamic="product"').text(productType);

    // add fieldsets from template
    if (productType == 'tag') {
        if ( isFlickity ) {
            $carousel.flickity('destroy');
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            $('.quote-carousel').append($tagQuoteTemplate);
            componentHandler.upgradeDom();
            $carousel.flickity({
                prevNextButtons: false
            });
        }
    } else if (productType == 'label') {
        if ( isFlickity ) {
            $carousel.flickity('destroy');
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            $('.quote-carousel').append($labelQuoteTemplate);
            componentHandler.upgradeDom();
            $carousel.flickity({
                prevNextButtons: false
            });
        }
    } else if (productType == 'sign') {
        if ( isFlickity ) {
            $carousel.flickity('destroy');
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            $('.quote-carousel').append($signQuoteTemplate);
            componentHandler.upgradeDom();
            $carousel.flickity({
                prevNextButtons: false
            });
        }
    }

});

// Style Type quote logic
$('.quote-form').on('change', 'input[name="style"]', function() {
    var styleType = $(this).val();
    $('span[data-dynamic="style"').text(styleType);
});

// Photo input animations
$('quote-form').on('change', '#photoFront', function() {
    $(this).next().addClass('uploaded');
});

$('.quote-form').on('change', '#photoBack', function() {
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
