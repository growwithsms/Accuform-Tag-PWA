//@prepros-prepend vendor/jquery-3.1.1.min.js

//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js
//@prepros-prepend vendor/textfield.js
//@prepros-prepend vendor/flickity.pkgd.min.js
//@prepros-prepend vendor/js.cookie.js


/*
|************************************************|
|************************************************|
| Global                                         |
|************************************************|
|************************************************|
*/

/*
|----------------------------|
| Virtual Keyboard FIX       |
|----------------------------|
*/
$('body').on('focus', 'textarea, input[type="text"], input[type="number"]', function() {
    $('body').addClass('position-static');
}).on('blur', 'textarea, input', function() {
    $('body').removeClass('position-static');
});


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
| Quote Database             |
|----------------------------|
*/
// Define the database
var db = new Dexie('quote_database');
db.version(1).stores({
    endUsers: 'company,name,email',
    quotes: '++id,material,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
});


/*
|************************************************|
|************************************************|
| Quote Page                                     |
|************************************************|
|************************************************|
*/
if ($('.quote-page').length) {

    // init quote carousel
    var $carousel = $('.quote-carousel').flickity({
        prevNextButtons: false
    });

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */
    // Register User
    if (Cookies.get('cqs-userStatus') != 'registered') {

        $('.login').show();
        $('.login form').on('submit', function(e) {
            e.preventDefault();

            var userName = document.getElementById('userName').value,
                userEmail = document.getElementById('userEmail').value;

            Cookies.set('cqs-userStatus', 'registered');
            Cookies.set('cqs-name', userName);
            Cookies.set('cqs-email', userEmail);

            $('body').addClass('userRegistered');
            $('.login').addClass('fadeOut');
            $('#quote-form').show();
            $carousel.flickity('destroy');
            $carousel.flickity({
                prevNextButtons: false
            });

            return false;
        });
    } else {
        $('body').addClass('userRegistered');
        $('#quote-form').show();
        $carousel.flickity('destroy');
        $carousel.flickity({
            prevNextButtons: false
        });
    }


    // product/quote templates
        
    var $tagQuoteTemplate = $('#tag-quote').html().trim(),


        $labelQuoteTemplate = $('#label-quote').html().trim(),
        $signQuoteTemplate = $('#sign-quote').html().trim();

    // Product Type quote logic
    $('input[name="productType"]').on('change', function() {

        // change text to selected product name in carousel
        var productType = $(this).val();
        $('span[data-dynamic="product"]').text(productType);

        // add fieldsets from template
        if (productType == 'tag') {
            // destroy existing flickity carousel
            $carousel.flickity('destroy');
            // reset DOM
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            // insert appropriate product template
            $('.quote-carousel').append($tagQuoteTemplate);
            // upgrade new mdl elements from template
            componentHandler.upgradeDom();
            // init flickity carousel
            $carousel.flickity({
                prevNextButtons: false
            });
        } else if (productType == 'label') {
            // destroy existing flickity carousel
            $carousel.flickity('destroy');
            // reset DOM
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            // insert appropriate product template
            $('.quote-carousel').append($labelQuoteTemplate);
            // upgrade new mdl elements from template
            componentHandler.upgradeDom();
            // init flickity carousel
            $carousel.flickity({
                prevNextButtons: false
            });
        } else if (productType == 'sign') {
            // destroy existing flickity carousel
            $carousel.flickity('destroy');
            // reset DOM
            $('.quote-carousel fieldset:not(.quote-get-started)').remove();
            // insert appropriate product template
            $('.quote-carousel').append($signQuoteTemplate);
            // upgrade new mdl elements from template
            componentHandler.upgradeDom();
            // init flickity carousel
            $carousel.flickity({
                prevNextButtons: false
            });
        }

        // Swipe for next step hint
        $('.quote-get-started').addClass('started');

    });

    // Style Type quote logic
    $('#quote-form').on('change', 'input[name="style"]', function() {
        var styleType = $(this).val();
        // updates label text to appropriate style
        $('span[data-dynamic="style"').text(styleType);
    });

    // Shape Type quote logic - hide size height for circle shape
    $('#quote-form').on('change', 'input[name="shape"]', function() {
        var shapeType = $(this).val();
        if (shapeType == "Circle") {
            $('.quote-size .mdl-grid > div:not(:first-child):not(:last-child):not(:nth-child(4)').hide();
        } else {
            $('.quote-size .mdl-grid > div:not(:first-child):not(:last-child):not(:nth-child(4))').show();
        }
    });

    // Photo input animations
    $('#quote-form').on('change', '#photoFront, #photoBack', function() {
        $(this).next().addClass('uploaded');
    });

    // Submit form
    $('#quote-form').on('submit', function(e) {
        e.preventDefault();
        $('body').removeClass('quote-sent');

        // Loading Spinner
        var loading = $('.mdl-spinner');
        loading.addClass('is-active');
        var dialog = document.querySelector('dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        // get user data and put into hidden form fields
        var cookieUserName = Cookies.get('cqs-name'),
            cookieUserEmail = Cookies.set('cqs-email');
        $('#user').val(cookieUserName);
        $('#email').val(cookieUserEmail);

        // Activate Modal popup
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function() {
            dialog.close();
        });

        // add quote to local db via dexie
        //endUsers: 'company,name,email',
        //quotes: '++id,material,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'

        // Send form data to phpmailer
        var data = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '/mailer/mail.php',
            data: data,
            processData: false,
            contentType: false,
            success: function(data) {
                loading.removeClass('is-active');
                $('body').addClass('quote-sent');

                // reset quote carousel
                $carousel.flickity('destroy');
                $('.quote-carousel fieldset:not(.quote-get-started)').remove();
                $carousel.flickity({
                    prevNextButtons: false
                });
            }
        });

        return false;
    });

}



/*
|************************************************|
|************************************************|
| Profile Page                                   |
|************************************************|
|************************************************|
*/
if ($('.profile-page').length) {

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */
    // Register User
    if (Cookies.get('cqs-userStatus') != 'registered') {
        $('.login').show();
        $('.login form').on('submit', function(e) {
            e.preventDefault();

            var userName = document.getElementById('userName').value,
                userEmail = document.getElementById('userEmail').value;

            Cookies.set('cqs-userStatus', 'registered');
            Cookies.set('cqs-name', userName);
            Cookies.set('cqs-email', userEmail);

            $('#user').val(userName);
            $('#email').val(userEmail);

            $('body').addClass('userRegistered');
            $('.login').addClass('fadeOut');
            return false;
        });
    } else {
        $('body').addClass('userRegistered');
    }

    // set values on form fields
    var cookieUserName = Cookies.get('cqs-name'),
        cookieUserEmail = Cookies.set('cqs-email');
    $('#user').val(cookieUserName);
    $('#email').val(cookieUserEmail);

    $('#profile-form').on('submit', function(){
        var updatedUser     = $('#user').val(),
            updatedEmail    = $('#email').val();

        Cookies.set('cqs-name', updatedUser);
        Cookies.set('cqs-email', updatedEmail);

    });

}


/*
|************************************************|
|************************************************|
| History Page                                   |
|************************************************|
|************************************************|
*/
if ($('.history-page').length) {

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */
    // Register User
    if (Cookies.get('cqs-userStatus') != 'registered') {
        $('.login').show();
        $('.login form').on('submit', function(e) {
            e.preventDefault();

            var userName = document.getElementById('userName').value,
                userEmail = document.getElementById('userEmail').value;

            Cookies.set('cqs-userStatus', 'registered');
            Cookies.set('cqs-name', userName);
            Cookies.set('cqs-email', userEmail);

            $('body').addClass('userRegistered');
            $('.login').addClass('fadeOut');
            return false;
        });
    } else {
        $('body').addClass('userRegistered');
    }

    
    var $historyCardTemplate = $('#history-card').html().trim();

    function addToHistory(){
        collection.each(function(quote){
            var element = [quote.name];
            for (var i = 0; i < element.length; i++){ 
                var listed = document.createElement('li');
                listed.textContent = element[i];
                document.getElementById('mane').appendChild(listed);
            }
            //alert(element); <-- this call alerts all names in database.  
        });
    }


}

