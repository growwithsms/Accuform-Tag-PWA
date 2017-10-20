# Accuform-Tag-PWA
V2 rewrite of the Collect, Quote, and Save! app for Accuform

## App Structure
This is a completely client-side driven app.

There are 3 pages (or views, if you will):

1. `/index.html` the home page
2. `/history/index.html` the history page
3. `/profile/index.html` the profile page 

All of the app's logic is located in `/js/main.js`

All 3rd party scripts are located in `/js/vendor/`

`/js/main.min.js` is the concatenated and minified version of all the 3rd party scripts and the app's logic.

`/mailer/` the files in this directory are what power the quote email that gets sent on a successful form submission. The `/mailer/mail.php` is the file that creates the email and is where all the email content lives. However, all of the credentials and emails have been removed for security reasons. Make sure you don't overwrite the credentials or emails when updating this file on the dreamhost server.

`/sw.js` is the service worker that makes this site behave more like an app (Progressive Web App yo!). If you're having caching issues, it's more than likely because you need to update the cache name in the service worker. This should trigger the app to update itself upon next use.