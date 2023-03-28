const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const activitySchema = Schema({
  name: { type: String, unique: true },
  description: { type: String },
  file: {
    type: Object,
  },
  activityType: { type: String },
  fileUrl: { type: String },
  module: [{ type: Schema.Types.ObjectId, ref: "Module" }],
});

activitySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Activity", activitySchema);
