const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  },
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
  },
);

module.exports = mongoose.model('Todo', todoSchema);