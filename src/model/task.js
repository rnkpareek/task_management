var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter task name'
  },
  description: {
    type: String,
    required: 'Please enter task name'
  },
  end_date: {
    type: Date,
    default: Date.now,
    required: 'Please enter end date'
  },
  created_by: {
    type: String,
    default: 'guest'
  },
  creation_timestamp: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);
