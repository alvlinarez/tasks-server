const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Remove _id and retrieve id
taskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Task', taskSchema);
