const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const moduleSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  // learning: [
  //   {
  //     module: { type: Schema.Types.ObjectId, ref: "Module" },
  //     activity: [
  //       { id: { type: Schema.Types.ObjectId, ref: "Activity" } },
  //       { isComplete: { type: String } },
  //     ],
  //   },
  // ],
  // learning: [
  //   // {
  //   //   type: Object,
  //   // },
  //   {
  //     course: { type: Schema.Types.ObjectId, ref: "Course" },
  //     module: [
  //       { id: { type: Schema.Types.ObjectId, ref: "Module" } },
  //       { name: { type: String } },
  //       {
  //         activity: [
  //           { id: { type: Schema.Types.ObjectId, ref: "Activity" } },
  //           { isComplete: { type: String } },
  //         ],
  //       },
  //     ],
  //   },
  learning: [
    {
      type: Object,
    },
  ],
  dataactivity: [
    {
      type: Object,
    },
  ],
});

moduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Learner", moduleSchema);
