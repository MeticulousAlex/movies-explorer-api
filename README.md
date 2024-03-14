# Movies explorer api (frontend) ![Static Badge](https://img.shields.io/badge/version-1.0-green)

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

## Features

- Management of database of users and their saved films
- Model mask/Joi validation
- User's password is stored in the database as a hashcode
- JWT verification 
- User's JWT-signed Id is sent to frontend as a cookie
- Centralized error handling

## Documentation

This is a backend part of the Movie-explorer project. 

### New user handling
When a new user account is created on the front end of the application, the user's password, name, and email are sent to the backend where they are validated using Joi. Then, the password is encoded to a hash code to keep it safe outside the program. Next, user's data with an encoded password is forwarded to the MongoDB database as a new Mongoose model. The user is now created.

### Login
User's email and password are received from a login form on the front end part. Firstly, if the coincidental email is found, the stored password in the database is decoded from the hash and compared to the one received from the user. If the password is also correct, userId (which is the same as the id of the cell in the database where the user's data is stored) is signed with JWT. This signed userId is then sent to the frontend side as a cookie attached to a response containing other user's info (email, name). Since now the auto-login is possible.

Auto-login is available for a week after the last login/registration. During this time a cookie with JWT signed userId is stored in a browser. The next time the user visits the application, the cookie will be sent to the backend with an automatic initial request, where the JWT-signed userId will be extracted from the cookie and compared to other existing userId until it matches one. As userIds match, the user's data is forwarded to the front end.

### Saved movies
As the user saves a movie to favourites, the movieId (taken from another API to the frontend) of the chosen film is validated using Mongoose model mask and then added to the database with an **ownerId** property equal to the current user's Id. If the movies are to be fetched, userId is extracted from the request to the backend and then the **ownerId** property of all saved movies is compared to the extracted userId. Movies whose **ownerId** matched are put into an array and forwarded back to the frontend as a response.

Similarly, movie may be removed from the database.

### Update of user's info

A new user's email and/or name are passed to the backend, validated through the Mongoose model mask and after that, the database cell belonging to the user gets updated with new information.

## Project Links

- Movies-explorer service: https://alex.movie-explorer.nomoredomainsmonster.ru
- Front-end part of this project: https://github.com/MeticulousAlex/movies-explorer-frontend

## Feedback

If you found this project interesting or have any comments, please write me back at aleksandr.smelov.web@gmail.com. 
