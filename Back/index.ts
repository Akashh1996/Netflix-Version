const app = require('express')();
const chalk = require('chalk');
const debug = require('debug')('app*');
const { urlencoded, json } = require('body-parser');
const { connect } = require('mongoose');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

const port = process.env.PORT || 5000;
const databaseURL = 'mongodb+srv://root:root@cluster0.s3syf.mongodb.net/Netflix?retryWrites=true&w=majority';
connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(port, () => {
  debug(chalk.blue.underline(`Server is running in port ${chalk.red.bgYellow.bold(port)}`));
});
