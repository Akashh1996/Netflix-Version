const app = require('express')();
const chalk = require('chalk');
const debug = require('debug')('app*');
const { urlencoded, json } = require('body-parser');
const { connect } = require('mongoose');
const morgan = require('morgan');
const User = require('./src/model/userModel');
const userRouter = require('./src/router/userRouter')(User);

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

const port = process.env.PORT || 8000;
const URLDB = 'mongodb+srv://root:root@cluster0.s3syf.mongodb.net/Netflix?retryWrites=true&w=majority';
connect(URLDB, { useUnifiedTopology: true, useNewUrlParser: true });

app.use('/user', userRouter);

app.listen(port, () => {
  debug(chalk.blue.underline(`Server is running in port ${chalk.red.bgYellow.bold(port)}`));
});
