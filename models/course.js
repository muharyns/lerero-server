const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const courseSchema = Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  cover_image: { type: Object },
  cover_url: { type: String },
  keyword: { type: String },
  module: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);
