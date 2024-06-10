# Movies explorer (backend) ![Static Badge](https://img.shields.io/badge/version-1.0-green)

Backend part of "Movies-explorer" project, implemented to authorize users and to store data about accounts and saved movies.

## Technologies
- NodeJS
- Express
- MongoDB
- JSON Web Token
- Winston
- Helmet
- OpenSSH
- ESLint
- Joi Validation
- Postman

## Functionality

- Manipulation with databases of accounts and saved films.
- Validation through Joi and Mongoose Model.
- Hashing of password before saving in database.
- JWT verification of UserId.
- UserId is sent to client-side as a cookie.
- Centralized error handling.

## Setting up the project

Make sure that before you start you have these programs installed on your computer:

- Node.js
- MongoDB Compass

### Launching the project
```
//Clone the repository
git clone https://github.com/MeticulousAlex/movies-explorer-api.git

//Go to the project's folder
cd movies-explorer-api

//Install dependencies
npm install

//Launch the project
npm run start
```
## Links

- Website "Movies-explorer": https://alex.movie-explorer.nomoredomainsmonster.ru
- Frontend part of this project: https://github.com/MeticulousAlex/movies-explorer-frontend

## Feedback

If you found this project interesting or you have any comments, please, dont' hesitate to contact me at aleksandr.smelov.web@gmail.com. 
