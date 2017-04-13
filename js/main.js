//@prepros-prepend vendor/jquery-3.1.1.min.js

//@prepros-prepend vendor/dexie.js
//@prepros-prepend vendor/material.js
//@prepros-prepend vendor/dialog-polyfill.js
//@prepros-prepend vendor/textfield.js
//@prepros-prepend vendor/flickity.pkgd.min.js


/*
|************************************************|
|************************************************|
| Global                                         |
|************************************************|
|************************************************|
*/

/*
|----------------------------|
| Opening links in external safari - ios fix
|----------------------------|
*/
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

/*
|----------------------------|
| Onscreen Keyboard FIX      |
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
    users: 'name,email',
    endUsers: 'name,email,company',
    quotes: '++id,product,material,environment,shape,style,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
});
// Open the database
db.open().catch(function(error) {
    alert('Uh oh : ' + error);
});

// count quotes in history and output to bottom navigation
db.quotes.toCollection().count(function (count) {
    if(count > 0) {
	   $('.bottom-nav li:first-child a').prepend('<span class="count">' + count + '</span>');
    }
});

/*
|************************************************|
|************************************************|
| History Page                                   |
|************************************************|
|************************************************|
*/
if ( $('.history-page').length ) {

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */
    db.users.toCollection().count(function (count) {
        if ( count < 1 ) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.add({
                    name: userName,
                    email: userEmail
                });

                $('body').addClass('userRegistered');
                $('.login').addClass('fadeOut');
                return false;
            });
        } else {
            $('body').addClass('userRegistered');
        }
    });

    // Loop through previous quotes and output to dom
    db.quotes.each(function(quote) {
        // quotes: '++id,product,material,environment,shape,style,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
        if (quote.product == "Label") {
            $('.card-grid').prepend('' +
                '<div class="history-card-wide mdl-card mdl-shadow--2dp fadeIn" id="' + quote.id + '">' + 
                    '<div class="mdl-card__title" style="background-image: url(' + quote.imagefront + ');">' + 
                        '<h2 class="mdl-card__title-text">' + quote.product + ': ' + quote.material + '</h2>' +
                    '</div>' + 
                    '<div class="mdl-card__supporting-text">' +
                        '<b>Environment:</b> ' + quote.environment + '&nbsp; <b>Shape:</b> ' + quote.shape + '&nbsp; <b>Style:</b> ' + quote.style +
                    '</div>' + 
                '</div>'
            );
        } else if (quote.product == "Sign") {
            $('.card-grid').prepend('' +
                '<div class="history-card-wide mdl-card mdl-shadow--2dp fadeIn" id="' + quote.id + '">' +
                    '<div class="mdl-card__title" style="background-image: url(' + quote.imagefront + ');">' +
                        '<h2 class="mdl-card__title-text">' + quote.product + ': ' + quote.material + '</h2>' +
                    '</div>' + 
                    '<div class="mdl-card__supporting-text">' +
                        '<b>Environment:</b> ' + quote.environment + '&nbsp; <b>Finishing:</b> ' + quote.finishing + 
                    '</div>' + 
                '</div>'
            );
        } else {
            $('.card-grid').prepend('' +
                '<div class="history-card-wide mdl-card mdl-shadow--2dp fadeIn" id="' + quote.id + '">' + 
                    '<div class="mdl-card__title" style="background-image: url(' + quote.imagefront + ');">' + 
                        '<h2 class="mdl-card__title-text">' + quote.product + ': ' + quote.material + '</h2>' + 
                    '</div>' + 
                    '<div class="mdl-card__supporting-text">' + 
                        '<b>Finishing:</b> ' + quote.finishing + '&nbsp; <b>Size:</b> ' + quote.width + 'x' + quote.height + ' ' + quote.uom + 
                    '</div>' + 
                '</div>'
            );
        }

    });

}

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

    db.users.toCollection().count(function (count) {
        if ( count < 1 ) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.add({
                    name: userName,
                    email: userEmail
                });

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
    });

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
        if (productType == 'Tag') {
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

        } else if (productType == 'Label') {
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

            // Label style type text
            $('#quote-form').on('change', 'input[name="style"]', function() {
                var styleType = $(this).val();
                // updates label text to appropriate style
                $('span[data-dynamic="style"').text(styleType);
            });

            // Label shape: hides height when circle is selected
            $('#quote-form').on('change', 'input[name="shape"]', function() {
                var shapeType = $(this).val();
                if (shapeType == "Circle") {
                    $('.quote-size .mdl-grid > div:not(:first-child):not(:last-child):not(:nth-child(4)').hide();
                } else {
                    $('.quote-size .mdl-grid > div:not(:first-child):not(:last-child):not(:nth-child(4))').show();
                }
            });

        } else if (productType == 'Sign') {
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

            // Sign materials for indoor/outdoor
            $('#quote-form').on('change', 'input[name="environment"]', function() {

                var environmentType = $(this).val(),
                    $indoorTemplate = $('#indoor-materials').html().trim(),
                    $outdoorTemplate = $('#outdoor-materials').html().trim(),
                    $defaultTemplate = $('#default-materials').html().trim();

                if (environmentType == "Indoor") {
                    $('select#material').empty().html($indoorTemplate);
                } else if (environmentType == "Outdoor") {
                    $('select#material').empty().html($outdoorTemplate);
                } else {
                    $('select#material').empty().html($defaultTemplate);
                }

            });

        }

        // Swipe for next step hint
        $('.quote-get-started').addClass('started');

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

        // add user data to hidden form fields
        db.users.limit(1).each(function(user) {
            $('#user').val(user.name).parent().addClass('is-dirty');
            $('#email').val(user.email).parent().addClass('is-dirty');
        });

        // Activate Modal popup
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function() {
            dialog.close();
        });

        ///////////////////////////////////
        // add quote to local db via dexie
        ///////////////////////////////////
        // Get all values from form
        var userNameVal = $('#user').val(),
            userEmailVal = $('#email').val(),
            productTypeVal = $('input[name="productType"]:checked').val(),
            environmentVal = $('input[name="environment"]:checked').val(),
            shapeVal = $('input[name="shape"]:checked').val(),
            materialVal = $('#material').val(),
            styleVal = $('input[name="style"]:checked').val(),
            widthVal = $('#width').val(),
            heightVal = $('#height').val(),
            uomVal = $('#uom').val(),
            usageVal = $('#usage').val(),
            quantityVal = $('#quantity').val(),
            finishingVal = $('#finishing').val(),
            endUserNameVal = $('#endUserName').val(),
            endUserEmailVal = $('#endUserEmail').val(),
            endUserCompanyVal = $('#endUserCompany').val(),
            notesVal = $('#notes').val();

        // Convert photo to base64 for use in background image
        var file = document.querySelector('input[type=file]').files[0];
        if ($('input[type=file]').val()) {
            var reader  = new FileReader();
            reader.addEventListener("load", function () {
                var photosrc = reader.result;

                // make a new quote entry in database
                db.quotes.add({
                    product: productTypeVal,
                    environment: environmentVal,
                    shape: shapeVal,
                    material: materialVal,
                    style: styleVal,
                    height: heightVal,
                    width: widthVal,
                    uom: uomVal,
                    quantity: quantityVal,
                    usage: usageVal,
                    finishing: finishingVal,
                    notes: notesVal,
                    imagefront: photosrc
                });
                // make new end user entry in database
                db.endUsers.add({
                    company: endUserCompanyVal,
                    name: endUserNameVal,
                    email: endUserEmailVal
                });

            }, false);
            // once file has loaded, init the reader function
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            // make a new quote entry in database
            db.quotes.add({
                product: productTypeVal,
                environment: environmentVal,
                shape: shapeVal,
                material: materialVal,
                style: styleVal,
                height: heightVal,
                width: widthVal,
                uom: uomVal,
                quantity: quantityVal,
                usage: usageVal,
                finishing: finishingVal,
                notes: notesVal,
            });
            // make new end user entry in database
            db.endUsers.add({
                company: endUserCompanyVal,
                name: endUserNameVal,
                email: endUserEmailVal
            });
        }
        

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
    db.users.toCollection().count(function (count) {
        if ( count < 1 ) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.add({
                    name: userName,
                    email: userEmail
                });

                $('body').addClass('userRegistered');
                $('.login').addClass('fadeOut');
                return false;
            });
        } else {
            $('body').addClass('userRegistered');
        }
    });

    // set values on form fields
    db.users.limit(1).each(function(user) {
        $('#user').val(user.name).parent().addClass('is-dirty');
        $('#email').val(user.email).parent().addClass('is-dirty');
    });
    
    $('#profile-form').on('submit', function() {
        var updatedUser = $('#user').val(),
            updatedEmail = $('#email').val();

        db.friends.update(1, {name: updatedUser});
        db.friends.update(1, {name: updatedEmail});

    });

}