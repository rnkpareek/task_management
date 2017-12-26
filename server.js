var express = require('express');

var app = express();

var mongoose = require('mongoose');
var Task = require('./src/model/task');
var taskController = require('./src/controller/taskController');
var bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/task_management');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.route('/tasks')
    .get(taskController.get_all_tasks)
    .post(taskController.create_task);


app.route('/tasks/:taskId')
    .get(taskController.read_task_by_id)
    .put(taskController.update_task_by_id)
    .delete(taskController.delete_task_by_id);

app.listen(3000);
console.log("Listening on port 3000");

module.exports = app;
