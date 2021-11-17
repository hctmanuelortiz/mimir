# mimir
Meteor with Blaze

Links Locos: 
https://forums.meteor.com/t/cant-get-current-user-on-usetracker-when-refresh-page/51413
https://javascript.hotexamples.com/examples/meteor.djabatav%3Ageolocation-plus/Location/-/javascript-location-class-examples.html
https://stackoverflow.com/questions/24835925/meteor-js-reactive-html5-geolocation-position-coords
https://stackoverflow.com/questions/33728241/meteor-easiest-way-to-get-longitude-and-latitude
https://github.com/meteor/mobile-packages/
https://forums.meteor.com/t/cant-pass-geolocation-object-with-meteor-call-but-anything-else-works/11834
https://newbedev.com/gps-coordinates-in-background-in-cordova-app
https://stackoverflow.com/questions/32742021/meteor-redirect-after-login-and-logout
https://forums.meteor.com/t/cant-get-current-user-on-usetracker-when-refresh-page/51413
https://guide.meteor.com/structure.html
https://stackoverflow.com/questions/10122977/what-are-the-best-practices-for-structuring-a-large-meteor-app-with-many-html-te
https://iron-meteor.github.io/iron-router/
http://meteortips.com/second-meteor-tutorial/user-accounts/



lib/                       # <- any common code for client/server.
lib/environment.js         # <- general configuration
lib/methods.js             # <- Meteor.method definitions
lib/external               # <- common code from someone else
## Note that js files in lib folders are loaded before other js files.

collections/               # <- definitions of collections and methods on them (could be models/)

client/lib                 # <- client specific libraries (also loaded first)
client/lib/environment.js  # <- configuration of any client side packages
client/lib/helpers         # <- any helpers (handlebars or otherwise) that are used often in view files

client/application.js      # <- subscriptions, basic Meteor.startup code.
client/index.html          # <- toplevel html
client/index.js            # <- and its JS
client/views/<page>.html   # <- the templates specific to a single page
client/views/<page>.js     # <- and the JS to hook it up
client/views/<type>/       # <- if you find you have a lot of views of the same object type
client/stylesheets/        # <- css / styl / less files

server/publications.js     # <- Meteor.publish definitions
server/lib/environment.js  # <- configuration of server side packages

public/                    # <- static files, such as images, that are served directly.

tests/                     # <- unit test files (won't be loaded on client or server)


####################################  
 meteor create appName --full 
  imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
      useraccounts-configuration.js # configure login templates
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point

  api/
    lists/                     # a unit of domain logic
      server/
        publications.js        # all list-related publications
        publications.tests.js  # tests for the list publications
      lists.js                 # definition of the Lists collection
      lists.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to lists
      methods.tests.js         # tests for those methods

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code
