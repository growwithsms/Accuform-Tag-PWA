//@prepros-prepend vendor/jquery-3.2.1.min.js
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
(function(a, b, c) {
    if (c in b && b[c]) {
        var d,
            e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener(
            "click",
            function(a) {
                d = a.target;
                while (!f.test(d.nodeName)) d = d.parentNode;
                "href" in d &&
                    (d.href.indexOf("http") || ~d.href.indexOf(e.host)) &&
                    (a.preventDefault(), (e.href = d.href));
            },
            !1
        );
    }
})(document, window.navigator, "standalone");

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
| Swipe to Next Screen       |
|----------------------------|
*/
$('body').on('change', 'fieldset input, fieldset select', function() {
    $(this).closest('fieldset').addClass('started');
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

db.version(10).stores({
    users: '++id,name,email,phone,company',
    quotes: '++id,timestamp,product,material,environment,shape,style,height,width,uom,quantity,usage,imagefront,imageback,finishing,notes'
})

// Open the database
db.open().catch(function(error) {
    alert(error);
});

// count quotes in history and output to bottom navigation
db.quotes.toCollection().count(function(count) {
    if (count > 0) {
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
if ($('.history-page').length) {

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */
    db.users.toCollection().count(function(count) {
        if (count < 1) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.put({
                    id: 1,
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
                '<time datetime="' + quote.timestamp + '">' + quote.timestamp + '</time>' +
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
                '<time datetime="' + quote.timestamp + '">' + quote.timestamp + '</time>' +
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
                '<time datetime="' + quote.timestamp + '">' + quote.timestamp + '</time>' +
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

    // Globale page variables
    var quoteForm = $('#quote-form');

    // init quote carousel
    var $carousel = $('.quote-carousel').flickity({
        prevNextButtons: false
    });

    // add user data to hidden form fields
    db.users.limit(1).each(function(user) {
        $('#user').val(user.name);
        $('#email').val(user.email);
    });

    /*
    |----------------------------|
    | Profile Login Overlay      |
    |----------------------------|
    */

    db.users.toCollection().count(function(count) {
        if (count < 1) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.put({
                    id: 1,
                    name: userName,
                    email: userEmail
                });

                // add to hidden form fields
                db.users.limit(1).each(function(user) {
                    $('#user').val(user.name);
                    $('#email').val(user.email);
                });


                $('body').addClass('userRegistered');
                $('.login').addClass('fadeOut');
                quoteForm.show();
                $carousel.flickity('destroy');
                $carousel.flickity({
                    prevNextButtons: false
                });

                return false;
            });
        } else {
            
            // add user data to hidden form fields
            db.users.limit(1).each(function(user) {
                $('#user').val(user.name);
                $('#email').val(user.email);
            });
            
            $('body').addClass('userRegistered');
            quoteForm.show();
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
            // populate fields
            db.users.limit(1).each(function(user) {
                $('#phone').val(user.phone).parent().addClass('is-dirty');
                $('#company').val(user.company).parent().addClass('is-dirty');
            });
            // show Start and End fields for consecutive numbering
            quoteForm.on('change', '#common-sizes', function() {
                if( $(this).val() == "Other" ) {
                    $('#size').removeClass('hidden');
                } else {
                    $('#size').addClass('hidden');
                }
            });
            // show height/width inputs when "Other" size is selected
            quoteForm.on('change', '#finishing', function() {
                if( $(this).val() == "Consecutive Numbering" ) {
                    $('#consecutive-numbering').removeClass('hidden');
                } else {
                    $('#consecutive-numbering').addClass('hidden');
                }
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
            // populate fields
            db.users.limit(1).each(function(user) {
                $('#phone').val(user.phone).parent().addClass('is-dirty');
                $('#company').val(user.company).parent().addClass('is-dirty');
            });

            // Label style type text
            quoteForm.on('change', 'input[name="style"]', function() {
                var styleType = $(this).val();
                // updates label text to appropriate style
                $('span[data-dynamic="style"').text(styleType);
            });

            // Label shape: hides height when circle is selected
            quoteForm.on('change', 'input[name="shape"]', function() {
                var shapeType = $(this).val();
                if (shapeType == "Circle") {
                    $('.width-wrapper').hide();
                    $('.x-wrapper').hide();
                    $('.height-wrapper label').text('Diameter');
                } else {
                    $('.width-wrapper').show();
                    $('.x-wrapper').show();
                    $('.height-wrapper label').text('Height');
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
            // populate fields
            db.users.limit(1).each(function(user) {
                $('#phone').val(user.phone).parent().addClass('is-dirty');
                $('#company').val(user.company).parent().addClass('is-dirty');
            });
            // Sign materials for indoor/outdoor
            quoteForm.on('change', 'input[name="environment"]', function() {
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
            // show describe material field if other is selected
            quoteForm.on('change', '#material', function() {
                if( $(this).val() == "Other" ) {
                    $('#material-description-wrapper').removeClass('hidden');
                } else {
                    $('#material-description-wrapper').addClass('hidden');
                }
            });
        }
        // show Start and End fields for consecutive numbering
        quoteForm.on('change', '#common-sizes', function() {
            if( $(this).val() == "Other" ) {
                $('#size').removeClass('hidden');
            } else {
                $('#size').addClass('hidden');
            }
        });
    });

    // Photo input animations
    quoteForm.on('change', '#photoFront, #photoBack', function() {
        $(this).next().addClass('uploaded');
    });

    // Prevent enter key from submitting form
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    // Submit Quote
    quoteForm.on('click', '#submit-quote-button', function() {
        // Activate Modal popup
        var dialog = document.querySelector('dialog');
        dialog.showModal();
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.querySelector('#close').addEventListener('click', function() {
            dialog.close();
        });

        var $yesButton = $('#yes'),
            $noButton = $('#no'),
            $closeButton = $('#close'),
            $sendButton = $('#send'),
            $someonesEmail = $('#someone-else-wrapper');

        // resets from previous quote
        $yesButton.removeClass('hidden');
        $noButton.removeClass('hidden');
        $closeButton.addClass('hidden');
        $sendButton.addClass('hidden');
        $someonesEmail.addClass('hidden');

        $yesButton.on('click', function(){
            $someonesEmail.removeClass('hidden');
            $yesButton.addClass('hidden');
            $noButton.addClass('hidden');
            $('#someone-else-faux').on('keyup', function(){
                if( $(this).is(':valid') ) {
                    $sendButton.removeClass('hidden');
                    // clone to real / hidden field in the form
                    var someonesEmail = $(this).val();
                    $('#someone-else').val(someonesEmail);
                } else {
                    $sendButton.addClass('hidden');
                }
            });
        });

        $('.send-quote').on('click', function(){
            $yesButton.addClass('hidden');
            $noButton.addClass('hidden');
            $sendButton.addClass('hidden');
            // Loading Spinner
            var loading = $('.mdl-spinner');
            loading.addClass('is-active');
        });

    });

    quoteForm.on('submit', function(e) {
        e.preventDefault();
        $('body').removeClass('quote-sent');

        // Send form data to phpmailer
        formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '/mailer/mail.php',
            data: formData,
            processData: false,
            contentType: false,
            success: function(formData) {
                // add quote to local db
                function storeQuote() {

                    // Get all values from form
                    var productTypeVal = $('input[name="productType"]:checked').val(),
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
                        notesVal = $('#notes').val(),
                        companyVal = $('#company').val(),
                        phoneVal = $('#phone').val(),
                        currentTime = new Date();

                    // Convert photo to base64 for use in background image
                    var file = document.querySelector('input[type=file]').files[0];
                    if ($('input[type=file]').val()) {
                        var reader = new FileReader();
                        reader.addEventListener("load", function() {
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
                                imagefront: photosrc,
                                timestamp: currentTime
                            });

                            db.users.update(1, {
                                phone: phoneVal,
                                company: companyVal
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
                            timestamp: currentTime
                        });

                        db.users.update(1, {
                            phone: phoneVal,
                            company: companyVal
                        });

                    }
                }
                storeQuote();
                var loading = $('.mdl-spinner'),
                    $closeButton = $('#close');
                loading.removeClass('is-active');
                $('body').addClass('quote-sent');
                $carousel.flickity('destroy');
                $('.quote-carousel fieldset:not(.quote-get-started)').remove();
                $carousel.flickity({
                    prevNextButtons: false
                });
                $closeButton.removeClass('hidden');
                $closeButton.on('click', function(){
                    $('body').removeClass('quote-sent');
                });
                document.getElementById("quote-form").reset();
            }
        });
        return false
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
    db.users.toCollection().count(function(count) {
        if (count < 1) {
            $('.login').show();
            $('.login form').on('submit', function(e) {
                e.preventDefault();

                var userName = document.getElementById('userName').value,
                    userEmail = document.getElementById('userEmail').value;

                db.users.update(1, {
                    name: userName,
                    email: userEmail
                });

                $('body').addClass('userRegistered');
                $('.login').addClass('fadeOut');

                db.users.limit(1).each(function(user) {
                    $('#user').val(user.name).parent().addClass('is-dirty');
                    $('#email').val(user.email).parent().addClass('is-dirty');
                });

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

    var profileForm = $('#profile-form');

    // Enable submit button when updated value exists
    profileForm.on('change paste keyup', 'input', function(){
    	$('.mdl-button--accent').prop('disabled',false);
    });

    profileForm.on('submit', function() {

        var updatedUser = $('#user').val(),
            updatedEmail = $('#email').val();

        db.users.update(1, {
            name: updatedUser,
            email: updatedEmail
        });

    });

}