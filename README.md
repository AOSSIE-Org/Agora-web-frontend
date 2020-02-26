# Agora-Web Frontend

## Readme

_Frontend for Agora Web that uses [Agora](https://gitlab.com/aossie/Agora/): An Electronic Voting Library implemented in Scala. This application uses [Agora Web API](https://gitlab.com/aossie/Agora-Web) as backend application_


This project is created using the [Angular 8](https://angular.io/) web framework.


To run the development environment for this frontend, you need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed.

## Table of contents

- [Agora-Web Frontend](#agora-web-frontend)
    - [Readme](#readme)
    - [Table of contents](#table-of-contents)
    - [Installation](#installation)
    - [Running the application](#running-the-application)
    - [Building the application](#building-the-application)
    - [Deployment](#deployment)
    - [Troubleshooting your local environment](#troubleshooting-your-local-environment)
    - [Contributing Code](#contributing-code)
    - [Further Reading / Useful Links](#further-reading-useful-links)


## Installation

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally. We use [NPM](https://www.npmjs.com/get-npm) to manage the dependencies, so we strongly recommend you to use it. you can install it from [Here](https://www.npmjs.com/get-npm), then run `npm install` to resolve all dependencies (might take a minute).


## Running the application
To use Facebook login you will need to change the following in app.module.ts
    ```
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("Your app id here")
        }
    ```
For more information visit [Angularx-social-login](https://github.com/abacritt/angularx-social-login)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building the application
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Deployment 
The current development branch is deployed on heroku and is available at http://agora-frontend.herokuapp.com/

## Troubleshooting your local environment

Always `git pull` and get the latest from master. [Google](https://www.google.com) and [Stackoverflow](https://stackoverflow.com/) are your friends. You can find answers for most technical problems there. If you run into problems you can't resolve, feel free to open an issue.


## Contributing code
Any and all contributions to the project are welcome.

Issues tagged as [good first issue](https://gitlab.com/aossie/Agora-web-frontend/issues?label_name%5B%5D=Good+first+issue) should be a good place to start.

If you're ready to contribute code, see [the contribution guide](docs/contributing.md).


## Further Reading / Useful Links


* [Node.js](https://nodejs.org/en/) - Provides the package manager used in this project
* [Agular CLI](https://cli.angular.io/) - Command line tool required to work with application
* [Angular 8](https://angular.io/) - The web framework used to build this project
* [Bootstrap](https://getbootstrap.com/) - HTML and CSS frontend framework