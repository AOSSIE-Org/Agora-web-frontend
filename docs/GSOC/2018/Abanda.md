# Agora Web Frontend

## Student - Abanda Ludovic
## Links  
- Project : https://gitlab.com/aossie/Agora-web-frontend
- Live demo of the Project :  http://agora-frontend.herokuapp.com/
- Wiki page : [Wiki](../../wiki.md)

## Agora Frontend  

The goal of the project is to divide the old agora platform into a REST API and a web frontend. This part of the project was to produce an angular 6 application as frontend for the Agora platform. The project was built from scratch after the backend was in an advanced state. The following parts will describe the project in details.

### Use case modeling 

I have identified the following tasks in the project at the starting of the project.
1. Interface for user signup and login with email base accounts - **Done**
2. Interface for user login using social media account - **Done** 
3. Interface for user to change password for email based accounts - **Done** 
4. Interface for user to logout - **Done** 
5. Interface for user to create and schedule Election.  - **Done** 
6. Interface for user to edit Election.  - **Done** 
7. Interface for user to delete the Election. - **Done** 
8. Interface for election creator to invite the voters to vote for the Election. - **Done** 
9. Interface for voters to vote the Election. - **Done** 
10. Interface for for election results - **Done** 

### Deep view into the technology. 

This project is created using [Angular 6](https://angular.io/). It makes use of various open source libraries available for angular 6. Some of which are listed below

* [Node.js](https://nodejs.org/en/) - Provides the package manager used in this project
* [Agular CLI](https://cli.angular.io/) - Command line tool required to work with application
* [Angular 6](https://angular.io/) - The web framework used to build this project
* [Bootstrap](https://getbootstrap.com/) - HTML and CSS frontend framework
* [Angularx-social-login](https://github.com/abacritt/angularx-social-login) - Social login library for angular applications
* [Agular material design](https://material.angular.io/guide/getting-started) - Material design for angular applications
* [Font-awesome](https://fontawesome.com/) - Provides beautiful icon used in the projects
* [Material icons](https://material.io/tools/icons/?style=baseline) - Material design icons for angular applications
* [ng-pick-datetime](https://www.npmjs.com/package/ng-pick-datetime) - DateTime picker library used to select date and time
* [sweetalert2](https://github.com/sweetalert2/sweetalert2) - Notification library used to give feedback to the user

We started working on the frontend at the beginning of the second phase of GSOC. We started by defining all models that are required to communicate with the backend. After which we hosted the minimal app on heroku. From there we started working with user authentication, the first authentication type we started with was the email based account authentication system the we later finished with authentication using social providers such as Facebook. To obtain social accounts from the social providers we used [Angularx-social-login](https://github.com/abacritt/angularx-social-login). At this point users could signup and login into the system

After which we worked on user specific actions such as viewing profile information, updating profile, changing their password and user logout. We created interfaces for the actions described above

After that we started working on election services and specific models to support our design. We created interfaces to create, edit and delete elections along side with a dashboard. After this we created interfaces for the election creator to invite voters, we also created interfaces for these voters to vote for the elections they were invited. Then finally we created an interface to show the results of the election.

I would like to thank every AOSSIE member, especially my mentors, Thuvarakan Tharmarajasingam, Bruno Woltzenlogel Paleo and Ezequiel Postan for being so nice and helpful. I have learnt a lot in the past 3 months and it has been a great experience to be a part of this wonderful community. 

### Merge Requests 
1. [ Merge request !1](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/4) - Initial angular 6 setup: - status *Merged*
    * Initialized the project with Agular 6 web framework

2. [Merge request !2](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/6) - Added angularx-social plugin for OAuth2 authentication - status *Merged*
    * Added [Angularx-social-login](https://github.com/abacritt/angularx-social-login) plugin that was required for OAuth2 authentication

3. [Merge request !3](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/7) - Footer header  - Status: *Merged*
    * Implemented footer and header components

4. [Merge request !4](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/9) - Login logout - Status: *Merged*
    * Implemented user signup and signin using email base accounts
    * Implemented user signin using social providers.

5. [Merge request !5](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/10) - Dashboard - Status: *Merged*
    * Implemented user  dashboard containing user elections and some statistics
    * Implemented profile interface with ability to update profile information 
    * Implemented add, edit and election interfaces
    * Implemented interface for election creator to invite voters

6. [Merge request !6](https://gitlab.com/aossie/Agora-web-frontend/merge_requests/11) - Result and voting - Status: *Merged*
    * Implemented interface for voters to vote
    * Implemented interface for user to view election results
    * Made some major bug fixes
