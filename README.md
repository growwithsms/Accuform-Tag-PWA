# Accuform-Tag-PWA
V2 rewrite of the Collect, Quote, and Save! app for Accuform

## App Structure
This is a completely client-side driven app.

There are 3 pages (or views, if you will):
- the homepage "/index.html"
- the history page "/history/index.html"
- and the profile page "/profile/index.html"

All of the app's logic is located in "/js/main.js". All 3rd party scripts are located in "/js/vendor/". "/js/main.min.js" is the concatenated and minified version of all the 3rd party scripts and the app's logic.

PHPmailer is what powers the quote email that gets sent on a successful form submission.

sw.js is the service worker that makes it a progressive web app. If you're having caching issues, it's more than likely because you need to update the cache name in the service worker. This should trigger the app to update itself upon next use.
