const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const middleware = require('./middlewares/middleware');
// eslint-disable-next-line import/no-unresolved, import/extensions
const limiter = require('./middlewares/rateLimit');
const allRoutes = require('./routes/index');
// const cors = require('./middlewares/cors');
const { BD_BITFILMS, PORT } = require('./utils/config');

const app = express();
mongoose.connect(BD_BITFILMS);
app.use(limiter);
app.use(cors({ origin: ['https://iwtarmovies.nomoredomainsicu.ru'], credentials: true }));
// app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use(allRoutes);

app.use(errorLogger);
app.use(errors());
app.use(middleware);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
