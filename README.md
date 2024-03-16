# Movies explorer (бэкенд) ![Static Badge](https://img.shields.io/badge/version-1.0-green)

Бэкенд часть проекта Movies explorer, реализованная для хранения информации о созданных аккаунтах и сохраненных фильмах, а так же авторизации пользователей.

## Технологии
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

## Функционал

- Работа с базами данных пользователей и сохраненных фильмов
- Валидация через Joi и Mongoose Model
- Хэширование пароля перед сохранением в базу данных
- JWT верификация пользовательского Id
- Отправка userId на клиентскую часть в качестве cookie
- Централизованная обработка ошибок

## Установка

Перед запуском убедитесь, что на вашем компьютере установлены:
- Node.js
- MongoDB Compass

### Запуск проекта
```
//клонируйте репозиторий
git clone https://github.com/MeticulousAlex/movies-explorer-api.git

//перейдите в папку проекта
cd movies-explorer-api

//установите зависимости
npm install

//запустите проект
npm run start
```
## Ссылки проекта

- сервис Movies-explorer: https://alex.movie-explorer.nomoredomainsmonster.ru
- Фронтенд часть этого проекта: https://github.com/MeticulousAlex/movies-explorer-frontend

## Обратная свзязь

Если вы нашли этот проект интересным или у вас есть какие либо комментарии, не стесняйтесь писать мне на aleksandr.smelov.web@gmail.com. 

