require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/requestLimiter');
const { signinValidation, signupValidation } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const msg = require('./constants/response-messages');
const envConsts = require('./constants/evironmentConstants');
const corsOrigins = require('./constants/corsOrigins');

const { PORT = 3000 } = process.env;
const { MONGO_DB = envConsts.mongoServer } = process.env;
const app = express();

mongoose.connect(MONGO_DB);

app.use(cors({ credentials: true, origin: corsOrigins }));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.post('/signout', auth, logout);
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use('/', auth, (req, res, next) => next(new NotFoundError(msg.notFound)));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
