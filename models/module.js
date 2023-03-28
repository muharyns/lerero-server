const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const moduleSchema = Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  activity: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});

moduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Module", moduleSchema);
