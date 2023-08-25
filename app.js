const express = require('express');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const middleware = require('./middlewares/middleware');
// eslint-disable-next-line import/no-unresolved, import/extensions
const limiter = require('./middlewares/rateLimit');
const allRoutes = require('./routes');
const cors = require('./middlewares/cors');

const { PORT = 4000 } = process.env;
const { BD_BITFILMS } = process.env;

const app = express();
app.use(limiter);
app.use(cors);
app.use(requestLogger);
app.use(express.json());
mongoose.connect(BD_BITFILMS);
app.use(helmet());
app.use(allRoutes);

app.use(errorLogger);
app.use(errors());
app.use(middleware);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
