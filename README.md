# Base Project for Angular/Node Development

A comprehensive base project for Angular & Node/Express 4 development

Setup leans heavily towards modularity and separation of app code from framework details to allow isolated unit testing. The project uses modules throughout, Browserify in browser, native in Node. This allows us to, for example, have core app models that are used on the front and backend.

It also includes a full testing setup - mocha & chai are used throughout and the project contains examples of unit-testing in the browser using the Karma runner & testing in Node without a browser environment using Mocha, which is preferred where possible.


## Build Tool Setup

* Live Reload
* Automatic asset update in dev mode
* Browserify/Watchify
* Separate lib and app js bundles
* Angular annotation via ng-annotate 
* Server & Grunt config for:
    * Un-optimised dev mode
    * Optimised production build
* Notifications on grunt errors via grunt-notify
* Angular template compilation using html2js
* JS & CSS source maps in dev mode
* Image minification for png,jpg,gif,svg
* SASS support with Bootstrap
* Asset revision to enable ultra-long caching on server
* Node production view templates with asset revision


## Install

### Global Command Line Tools

This project uses some global command line tools, these can be installed via npm:

```
npm install -g mocha forever grunt-cli protractor karma kickit
```

This will install

* mocha, the test framework - http://visionmedia.github.io/mocha/
* forever, a tool that ensures a script is run continuously - https://github.com/nodejitsu/forever
* grunt-cli, the command line interface for the Grunt build tool - http://gruntjs.com/
* protractor, the Angular e2e framework - https://github.com/angular/protractor
* karma, the test runner from the Angular team - http://karma-runner.github.io/
* kickit, a tool for running multiple long-running shell processes - https://github.com/dburrows/kickit 

### NPM Modules

Run the standard `npm install` task in root of the project to install all local node modules used.

### Post-Install Tasks

To enable end-to-end testing we need to download some additional tools, we can use the `webdriver-manager` tool that protractor installs, run the following command:

```
webdriver-manager update
```

This will install the selenium standalone server & chromedriver to allow us to run automated tests in the browser.

## Commands

Run in root of project unless otherwise indicated
 
Boot up all processes for development - web server on http://localhost:3000, grunt in dev mode and the webdriver server  

```
kickit
```

Build the development version of the project and rebuild when changes occur  

```
grunt dev
```

Build the production version of the the project  
```
grunt dist
```

Run the development server on port 3000
```
npm run start
```

Run the production server using production assets on port 3001
```
npm run start-prod
```

Run the server with debugging enabled on port 3000
```
npm run start-debug
```

### Testing

Note: Integration and end-to-end tests assume a development server is running.

Run every test, using various runners (mocha, karma & protractor)
```
npm run npm test
```

Run server tests
```
npm run test-server
```

Run client unit tests in node
```
npm run test-client-unit-node
```

Run client unit tests in browser (Chrome) using Karma 
```
npm run test-client-unit-browser
```

Run end-to-end tests in browser using Protractor
```
npm run test-e2e
```


## Development Notes

### Using ng-annotate

Pay careful attention to comments of the form `/* @ngInject */` - these are annotations to indicate that ng-annotate should process the next function for Angular dependency injection annotations.
