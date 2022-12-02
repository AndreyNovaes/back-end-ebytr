const Express = require('express');
const cors = require('cors');
const tasksRouter = require('./handleTasks/Tasks.router');
const doc = require('./utils/documentation');

const App = Express();

App.use(cors());
App.use(Express.json());
App.use('/tasks', tasksRouter);
App.use('/', (req, res) => { res.json(doc); });

module.exports = App;
