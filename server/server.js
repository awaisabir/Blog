import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import DBConfig from './config/db';

import auth from './api/auth';
import users from './api/users';
import posts from './api/posts';

const PORT = process.env.PORT || 4200;
const app = express();

app.use(express.static('../client/build'));
/** Middleware(s) */
app.use(cors());
app.use(bodyParser.json());

/** Passport Config */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);

/** Mongoose */
mongoose.connect(DBConfig.address);

mongoose.connection.on('error', () => {
    console.log('Something went wrong with the db ...');
});

mongoose.connection.on('connected', () => {
    console.log('You are now connected to the db!');
});


app.get('*', (req, res) => {
    res.send('404');
});


app.listen(PORT, () => console.log(`App listening on ${PORT}`));