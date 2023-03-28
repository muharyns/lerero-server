const Thing = require("../models/thing");
const Course = require("../models/course");
const Activity = require("../models/activity");
const Module = require("../models/module");
const Learner = require("../models/learner");
const path = require("path");

const fs = require("fs");
const mongoose = require("mongoose");

exports.createCourse = (req, res, next) => {
  const thing = new Course({
    name: req.body.name,
    description: req.body.description,
    // cover_image: req.body.cover_image,
    keyword: req.body.keyword,
  });
  try {
    if (req.files) {
      let file = req.files.file;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      (thing.cover_image = {
        fileName: file.name,
        fileType: file.mimetype,
        fileUrl: `${req.protocol}://${req.get("host")}/images/${fileName}`,
      }),
        // thing.cover_image = `${req.protocol}://${req.get(
        //   "host"
        // )}/images/${fileName}`;
        file.mv(`./public/images/${fileName}/`, (err) => {
          if (err) return res.status(400).json({ error: err.message });
        });
    } else {
      thing.cover_url = req.body.coverUrl;
    }
    try {
      thing
        .save()
        .then(() => {
          res.status(201).json({ message: "Course Created Successfuly" });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    } catch (error) {
      res.status(400).json({
        error: error,
      });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.modifyCourse = (req, res, next) => {
  const course = new Course({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    //cover_image: req.body.cover_image,
    keyword: req.body.keyword,
  });

  // Course.findOne({
  //   _id: req.params.id,
  // })
  //   .then((course) => {
  try {
    if (req.files) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;

      //const filepath = `./public/images/${course.cover_image}`;
      (course.cover_image = {
        fileName: file.name,
        fileType: file.mimetype,
        fileUrl: `${req.protocol}://${req.get("host")}/images/${fileName}`,
      }),
        (course.cover_url = null);
      //fs.unlinkSync(filepath);

      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(400).json({ error: err.message });
      });
    } else {
      if (req.body.coverUrl && req.body.coverUrl != "undefined") {
        course.cover_url = req.body.coverUrl;
        course.cover_image = null;
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
  Course.updateOne({ _id: req.params.id }, course)
    .then(() => {
      res.status(201).json({
        message: "Course updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  //})
  // .catch((error) => {
  //   res.status(400).json({
  //     message: "no data found",
  //   });
  // });
};
exports.createActivity = (req, res, next) => {
  const activity = new Activity({
    name: req.body.name,
    description: req.body.description,
    //file: req.files,
    activityType: req.body.activityType,
    //  fileUrl: req.body.fileurl,
  });
  try {
    if (req.files) {
      //if (req.files.fileupload.size) {
      let file = req.files.fileupload;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;

      (activity.file = {
        fileName: file.name,
        fileType: file.mimetype,
        fileUrl: `${req.protocol}://${req.get("host")}/files/${fileName}`,
      }),
        file.mv(`./public/files/${fileName}/`, (err) => {
          if (err) return res.status(400).json({ error: err.message });
        });
      //  }
    } else {
      activity.fileUrl = req.body.fileurl;
    }
    try {
      activity
        .save()
        .then(() => {
          res.status(201).json({ message: "Activity Created Successfuly" });
        })
        .catch((error) => {
          res.status(401).json({
            error: error,
          });
        });
    } catch (error) {
      res.status(402).json({
        error: error,
      });
    }
  } catch (err) {
    res.status(403).json({ error: err });
  }
};

exports.modifyActivity = (req, res, next) => {
  const activity = new Activity({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    // file: req.files,
    activityType: req.body.activityType,
    //fileUrl: req.body.fileurl,
  });
  try {
    if (req.files) {
      // if (req.files.fileupload.size) {
      let file = req.files.fileupload;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      activity.file = {
        fileName: file.name,
        fileType: file.mimetype,
        fileUrl: `${req.protocol}://${req.get("host")}/files/${fileName}`,
      };
      activity.fileUrl = null;
      file.mv(`./public/files/${fileName}/`, (err) => {
        if (err) return res.status(400).json({ error: err.message });
      });
      //}
    } else {
      if (req.body.fileurl && req.body.fileurl != "undefined") {
        activity.fileUrl = req.body.fileurl;
        activity.file = null;
      }
      // else {
      //   activity.file = req.file;
      // }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }

  Activity.updateOne({ _id: req.params.id }, activity)
    .then(() => {
      res.status(201).json({ message: "Activity Updated Successfuly" });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};
exports.createModule = (req, res, next) => {
  const thing = new Module({
    name: req.body.name,
    description: req.body.description,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Module saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createThing = (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllCourse = (req, res, next) => {
  Course.find()
    .populate("module")
    .exec()
    .then((course) => {
      res.status(200).json(course);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getModuleAgg = (req, res, next) => {
  // Module.aggregate([
  //   {
  //     $lookup: {
  //       from: "courses", // collection name in db
  //       localField: "course",
  //       foreignField: "_id",
  //       as: "courseModule",
  //     },
  //   },
  //   {
  //     $unwind: "$courseModule",
  //   },
  //   {
  //     $lookup: {
  //       from: "activities", // collection name in db
  //       localField: "activity",
  //       foreignField: "_id",
  //       as: "activityModule",
  //     },
  //   },

  //   {
  //     $unwind: "$activityModule",
  //   },
  //   {
  //     $match: {
  //       "courseModule._id": mongoose.Types.ObjectId(req.params.id_course),
  //     },
  //   },
  // ])
  Module.find({
    course: { $in: [mongoose.Types.ObjectId(req.params.id_course)] },
  })
    .populate("activity")
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
      //   }) {
      // students contain WorksnapsTimeEntries
      // res.status(200).json(courseModule);
    });
};

exports.getModuletoAdd = (req, res, next) => {
  // Module.aggregate([
  //   {
  //     $match: {
  //       course: { $nin: [mongoose.Types.ObjectId(req.params.id_course)] },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "activities", // collection name in db
  //       localField: "activity",
  //       foreignField: "_id",
  //       as: "activityModule",
  //     },
  //   },
  //   // {
  //   //   $unwind: "$activityModule",
  //   // },
  // ])
  Module.find({
    course: { $nin: [mongoose.Types.ObjectId(req.params.id_course)] },
  })
    .populate("activity")
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getActivitytoAdd = (req, res, next) => {
  Activity.aggregate([
    {
      $match: {
        module: { $nin: [mongoose.Types.ObjectId(req.params.id_module)] },
      },
    },
  ])
    .exec()
    .then((moduleActivity) => {
      res.status(200).json(moduleActivity);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getLearnertoAssign = (req, res, next) => {
  Learner.aggregate([
    {
      $match: {
        course: { $nin: [mongoose.Types.ObjectId(req.params.id_course)] },
      },
    },
    {
      $lookup: {
        from: "users", // collection name in db
        localField: "user",
        foreignField: "_id",
        as: "userLearner",
      },
    },
    {
      $unwind: "$userLearner",
    },
  ])
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllModule = (req, res, next) => {
  Module.find()
    .populate("activity")
    .exec()
    .then((module) => {
      res.status(200).json(module);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllActivity = (req, res, next) => {
  Activity.find()
    .then((activity) => {
      res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.addModuleMaster = (req, res, next) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: "Course 5",
    module: module._id,
  });
  course
    .save()
    .then(() => {
      const module = new Module({
        name: "Module xxx",
        course: course._id, // assign the _id from the person
      });

      module
        .save()
        .then(() => {
          res.status(201).json({
            message: "Module saved successfully!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.addModule = (req, res, next) => {
  const moduleArr = req.body.module.split(",");

  let bulk_ops_arr = [];

  let bulk_ops_arr2 = [];

  try {
    for (let moduleVal of moduleArr) {
      //update module
      let update_op = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(moduleVal) },
          update: { $push: { course: req.body.id_course } },
        },
      };
      bulk_ops_arr.push(update_op);

      //update course
      let update_op2 = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(req.body.id_course) },
          update: { $push: { module: moduleVal } },
        },
      };
      bulk_ops_arr2.push(update_op2);
    }
    Module.bulkWrite(bulk_ops_arr).then(() => {
      Course.bulkWrite(bulk_ops_arr2).then(() => {
        res.status(201).json({
          message: "Module Added successfully!",
        });
      });
      console.log("ok");
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
exports.AssignCourse = (req, res, next) => {
  //   .then((learner) => {
  //     if (!learner) {
  //       //create one
  //       const learner = new Learner({
  //         user: mongoose.Types.ObjectId(req.body.id_user),
  //       });
  //       learner.save();

  //       if (err) return res.status(500).json({ message: err.message });
  //       // return res.status(404).json({
  //       //   error: new Error("No such course!"),
  //       // });
  //     }
  //   })
  //   .catch((error) => {
  //     return res.status(400).json({
  //       message: error,
  //     });
  //   });
  const learnerArr = req.body.learner.split(",");

  let bulk_ops_arr = [];
  let bulk_ops_arr2 = [];

  try {
    for (let learnerVal of learnerArr) {
      //update learner
      let update_op = {
        updateOne: {
          filter: { user: mongoose.Types.ObjectId(learnerVal) },
          update: { $push: { course: req.body.id_course } },
        },
      };
      bulk_ops_arr.push(update_op);

      //update course
      let update_op2 = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(req.body.id_course) },
          update: { $push: { user: learnerVal } },
        },
      };

      bulk_ops_arr2.push(update_op2);
    }
    Learner.bulkWrite(bulk_ops_arr).then(() => {
      Course.bulkWrite(bulk_ops_arr2).then(() => {
        //console.log("ok");
        res.status(201).json({ message: "Course assigned successfully" });
      });
    });

    // Course.bulkWrite(bulk_ops_arr2).then(() => {
    //   console.log("ok");
    // });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
exports.addActivity = (req, res, next) => {
  // const thing = new Activity({
  //   _id: req.params.id,
  //   module: req.params.module_id,
  // });
  // Activity.updateOne({ _id: req.params.id }, thing)
  //   .then(() => {
  //     res.status(201).json({
  //       message: "Activity Added successfully!",
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       error: error,
  //     });
  //     console.log("error", error);
  //   });

  // Module.updateOne(
  //   { _id: req.params.id },
  //   { $push: { activity: req.params.activity_id } }
  // )
  //   .then(() => {
  //     res.status(201).json({
  //       message: "Activity Added successfully!",
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       error: error,
  //     });
  //     console.log("error", error);
  //   });

  const activityArr = req.body.activity.split(",");
  //console.log(activityArr);
  //return false;
  let bulk_ops_arr = [];

  let bulk_ops_arr2 = [];

  try {
    for (let activityVal of activityArr) {
      //update activity
      let update_op = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(activityVal) },
          update: { $push: { module: req.body.id_module } },
        },
      };
      bulk_ops_arr.push(update_op);

      //update module
      let update_op2 = {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(req.body.id_module) },
          update: { $push: { activity: activityVal } },
        },
      };
      bulk_ops_arr2.push(update_op2);
    }
    Activity.bulkWrite(bulk_ops_arr).then(() => {
      Module.bulkWrite(bulk_ops_arr2).then(() => {
        res.status(201).json({
          message: "Activity Added successfully!",
        });
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.modifyModule = (req, res, next) => {
  Module.updateOne(
    { _id: req.params.id },
    {
      $set: {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
      },
    }
  )
    .then(() => {
      res.status(201).json({
        message: "Module updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteCourse = (req, res, next) => {
  Course.findOne({ _id: req.params.id })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          error: new Error("No such course!"),
        });
      }

      // if (thing.userId !== req.auth.userId) {
      //   return res.status(401).json({
      //     error: new Error("Unauthorized request!"),
      //   });
      // }
      Course.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Deleted!",
      });
    });
};

exports.deleteModule = (req, res, next) => {
  Module.findOne({ _id: req.params.id }).then((module) => {
    if (!module) {
      return res.status(404).json({
        error: new Error("No such Module!"),
      });
    }
    // if (module.userId !== req.auth.userId) {
    //   return res.status(401).json({
    //     error: new Error("Unauthorized request!"),
    //   });
    // }
    Module.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

exports.deleteActivity = (req, res, next) => {
  Activity.findOne({ _id: req.params.id }).then((activity) => {
    if (!activity) {
      return res.status(404).json({
        error: new Error("No such Activity!"),
      });
    }
    // if (activity.userId !== req.auth.userId) {
    //   return res.status(401).json({
    //     error: new Error("Unauthorized request!"),
    //   });
    // }
    Activity.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// exports.deleteThing = (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "Deleted!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    if (!thing) {
      return res.status(404).json({
        error: new Error("No such thing!"),
      });
    }
    if (thing.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error("Unauthorized request!"),
      });
    }
    Thing.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.getMyCourse = (req, res, next) => {
  Learner.find({
    user: { $in: [mongoose.Types.ObjectId(req.params.id_course)] },
  })
    .populate("activity")
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
      //   }) {
      // students contain WorksnapsTimeEntries
      // res.status(200).json(courseModule);
    });
};

exports.getLearnerAgg = (req, res, next) => {
  // Module.find({
  //   course: { $nin: [mongoose.Types.ObjectId(req.params.id_course)] },
  // })
  //   .populate("activity")
  //   .exec()
  //   .then((courseModule) => {
  //     res.status(200).json(courseModule);
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       error: error,
  //     });
  //   });
  // Learner.aggregate([
  //   {
  //     $match: {
  //       user: { $in: [mongoose.Types.ObjectId(req.params.id_user)] },
  //     },
  //   },

  //   {
  //     $lookup: {
  //       from: "courses", // collection name in db
  //       localField: "course",
  //       foreignField: "_id",
  //       as: "courseLearner",
  //     },
  //   },
  //   // {
  //   //   $unwind: "$courseLearner",
  //   // },
  // ])

  //   .exec()
  //   .then((moduleActivity) => {
  //     res.status(200).json(moduleActivity);
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       error: error,
  //     });
  //   });

  Course.find({
    user: { $in: [mongoose.Types.ObjectId(req.params.id_user)] },
  })
    //.populate("course")

    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
      //   }) {
      // students contain WorksnapsTimeEntries
      // res.status(200).json(courseModule);
    });

  // Learner.aggregate([
  //   {
  //     $lookup: {
  //       from: "courses", // collection name in db
  //       localField: "course",
  //       foreignField: "_id",
  //       as: "courseLearner",
  //     },
  //   },
  //   {
  //     $unwind: "$courseLearner",
  //   },
  //   // {
  //   //   $lookup: {
  //   //     from: "users", // collection name in db
  //   //     localField: "user",
  //   //     foreignField: "_id",
  //   //     as: "userLearner",
  //   //   },
  //   // },

  //   // {
  //   //   $unwind: "$userLearner",
  //   // },
  //   {
  //     $match: {
  //       user: mongoose.Types.ObjectId(req.params.id_user),
  //     },
  //   },
  // ])

  //   .exec()
  //   .then((courseModule) => {
  //     res.status(200).json(courseModule);
  //     //   }) {
  //     // students contain WorksnapsTimeEntries
  //     // res.status(200).json(courseModule);
  //   });
};

exports.modifyLearningPath = (req, res, next) => {
  // console.log(req.params);
  // return false;

  //  return res(req);
  // const thing = new Thing({
  //   _id: req.params.id,
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   userId: req.body.userId,
  // });
  // Learner.updateOne(
  //   { user: mongoose.Types.ObjectId(req.params.id_learner) },
  //   { $push: { onLearning: req.body } }
  // )
  //   .then(() => {
  //     res.status(201).json({
  //       message: "Activity Added successfully!",
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       error: error,
  //     });
  //     console.log("error", error);
  //   });

  let bulk_ops_arr = [];

  try {
    for (let learning of req.body) {
      //update module
      let update_op = {
        updateOne: {
          filter: { user: mongoose.Types.ObjectId(req.params.id_learner) },
          //update: { $push: { learning: learning } },
          update: { $push: { learning: learning } },
        },
      };
      bulk_ops_arr.push(update_op);
    }
    Learner.bulkWrite(bulk_ops_arr).then(() => {
      return res.status(200).json({ module: req.body });
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.getLearnerActivity = (req, res, next) => {
  // console.log("ok");
  // return false;

  //res.status(200).json({ message: "OK" });

  // Learner.find({
  //   // activity: {
  //   //   $id: { $in: mongoose.Types.ObjectId("641b05d414554842cd1b9371") },
  //   // },
  //   // leaning: {
  //   //   $in: mongoose.Types.ObjectId("641b05d414554842cd1b9371"),
  //   // },

  //   learning: {
  //     $elemMatch: {
  //       module: "64167d679e058c10311f772b",
  //     },
  //   },

  //   // learning: {
  //   //   $elemMatch: {
  //   //     "activity.id": mongoose.Types.ObjectId("641b05d414554842cd1b9371"),
  //   //   },
  //   // },
  // })
  //   //.populate("activity")
  //   .exec()
  //   .then((courseModule) => {
  //     res.status(200).json(courseModule);
  //     //   }) {
  //     // students contain WorksnapsTimeEntries
  //     // res.status(200).json(courseModule);
  //   });

  Learner.findOne(
    {
      _id: mongoose.Types.ObjectId("641e9961137465af79311bf1"),
    }
    // {
    //   $match: {
    //     learning: {
    //       $in: [mongoose.Types.ObjectId("64167d679e058c10311f772b")],
    //     },
    //   },
    // },

    //   {
    //     $lookup: {
    //       from: "activities", // collection name in db
    //       localField: "activity",
    //       foreignField: "_id",
    //       as: "activityModule",
    //     },
    //   },
    //   // {
    //   //   $unwind: "$activityModule",
    //   // },
    // {
    //   $match: {
    //     "activityModule._id": mongoose.Types.ObjectId(
    //       "64167d679e058c10311f772b"
    //     ),
    //   },
    // },
    // { $match: { "learning.module": "64167d679e058c10311f772b" } },
    // {
    //   learning: { $elemMatch: { id: "641b05d414554842cd1b9371" } },
    // }
  )
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
      //   }) {
      // students contain WorksnapsTimeEntries
      // res.status(200).json(courseModule);
    });
};

exports.addActivityLearner = (req, res, next) => {
  let activity = new Array();

  //console.log(req.body);
  //return false;
  req.body.map((item) => {
    item.activity.map((res) =>
      activity.push({ id: res._id, isComplete: false })
    );
  });
  const b = {
    course: req.body[0].course,
    activity,
  };

  let bulk_ops_arr = [];

  try {
    for (let learning of req.body) {
      //update module
      let update_op = {
        updateOne: {
          filter: { user: req.params.id_learner },
          //update: { $push: { learning: learning } },
          update: { $push: { dataactivity: learning } },
        },
      };
      bulk_ops_arr.push(update_op);
    }
    Learner.bulkWrite(bulk_ops_arr).then(() => {
      Learner.bulkWrite([
        {
          updateOne: {
            filter: { user: req.params.id_learner },
            //update: { $push: { learning: learning } },
            update: { $push: { learning: b } },
          },
        },
      ]).then(() => {
        return res.status(200).json({ module: req.body });
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.getActivity = (req, res, next) => {
  // console.log("ok");
  // return false;

  //res.status(200).json({ message: "OK" });

  // Learner.find({
  //   // activity: {
  //   //   $id: { $in: mongoose.Types.ObjectId("641b05d414554842cd1b9371") },
  //   // },
  //   // leaning: {
  //   //   $in: mongoose.Types.ObjectId("641b05d414554842cd1b9371"),
  //   // },

  //   learning: {
  //     $elemMatch: {
  //       module: "64167d679e058c10311f772b",
  //     },
  //   },

  //   // learning: {
  //   //   $elemMatch: {
  //   //     "activity.id": mongoose.Types.ObjectId("641b05d414554842cd1b9371"),
  //   //   },
  //   // },
  // })
  //   //.populate("activity")
  //   .exec()
  //   .then((courseModule) => {
  //     res.status(200).json(courseModule);
  //     //   }) {
  //     // students contain WorksnapsTimeEntries
  //     // res.status(200).json(courseModule);
  // //   });
  console.log(req.params.mod_name);
  //return false;
  Learner.find(
    // {
    //   dataactivity: {
    //     $elemMatch: {
    //       name: { $eq: "Module 4" },
    //     },
    //   },
    //   // "dataactivity._id": "64167d679e058c10311f772b",
    // },
    // { dataactivity: 1, _id: 0 }
    { "dataactivity.name": req.params.mod_name },
    {
      _id: 0,
      dataactivity: { $elemMatch: { name: req.params.mod_name } },
    }
    // { $match: { "dataactivity.name": "module " } }
    // {
    //   $match: {
    //     learning: {
    //       $in: [mongoose.Types.ObjectId("64167d679e058c10311f772b")],
    //     },
    //   },
    // },

    //   {
    //     $lookup: {
    //       from: "activities", // collection name in db
    //       localField: "activity",
    //       foreignField: "_id",
    //       as: "activityModule",
    //     },
    //   },
    //   // {
    //   //   $unwind: "$activityModule",
    //   // },
    // {
    //   $match: {
    //     "activityModule._id": mongoose.Types.ObjectId(
    //       "64167d679e058c10311f772b"
    //     ),
    //   },
    // },
    // { $match: { "learning.module": "64167d679e058c10311f772b" } },
    // {
    //   learning: { $elemMatch: { id: "641b05d414554842cd1b9371" } },
    // }
  )
    //  .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
      //   }) {
      // students contain WorksnapsTimeEntries
      // res.status(200).json(courseModule);
    });
};

exports.getPathLearner = (req, res, next) => {
  //console.log(req.query);
  Learner.find({ user: req.query.learner, "learning.course": req.query.id })
    .exec()
    .then((courseModule) => {
      res.status(200).json(courseModule);
    });
};

exports.modifyLearnerPath = (req, res, next) => {
  //console.log(req.body);
  //return false;
  //Learner.replaceOne(
  //{
  //updateOne: {
  // filter: {
  //   learning: { course: "641c45ed333cb1222087aa31" },
  //   //user: mongoose.Types.ObjectId("64200f3c878dce6ed39154d4"),
  // },
  // //update: { $push: { learning: learning } },
  // update: { $set: { activity: req.body } },
  //    },
  //}
  //   { learning: { course: "641c45ed333cb1222087aa31" } },
  //   {
  //     $set: { activity: req.body },
  //   }
  // )
  //   .exec()
  //   .then(() => {
  //     return res.status(200).json({ module: req.body });
  //   });

  let bulk_ops_arr2 = [];
  console.log(req.body);
  try {
    //for (let learnerVal of learnerArr) {
    //update learner
    // let update_op = {
    //   replaceOne: {
    //     filter: { learning: { course: "641c45ed333cb1222087aa31" } },
    //     update: { $set: { learning: { activity: req.body } } },
    //   },
    // };
    // bulk_ops_arr2.push(update_op);

    // //}
    // Learner.bulkWrite(bulk_ops_arr2).then(() => {
    //   console.log("ok");
    //   res.status(201).json({ message: "Course assigned successfully" });
    // });

    // Course.bulkWrite(bulk_ops_arr2).then(() => {
    //   console.log("ok");
    // });

    // Learner.updateOne(
    //   // {
    //   //   "learning.course": "641c45ed333cb1222087aa31",
    //   //   "activity.id": "641b05d414554842cd1b9371",
    //   // },
    //   // { $set: { "learning.$[].activity.$.isComplete": "expert" } }
    //   //{ arrayFilters: [{ "xxx.id": "641b05d414554842cd1b9371" }] }
    // )
    // { "learning.course": "641c45ed333cb1222087aa31" },
    // {
    //   $set: {
    //     "learning.activity.$[xxx].isComplete": "kjkds",
    //   },
    // },
    // { arrayFilters: [{ "xxx.id": "641b05d414554842cd1b9371" }] }

    // {
    //   "learning.course": "641c45ed333cb1222087aa31",
    //   "learning.activity.id": "641b05d414554842cd1b9371",
    // },
    // { $set: { "learning.$.activity.$[elem].isComplete": "kkjnm" } },
    // { arrayFilters: [{ "elem.id": "641b05d414554842cd1b9371" }] }
    // {
    //   _id: ObjectId("64211a9d2e40c42dc23ce2a0"),
    //   "learning.course": ObjectId("641c471069c5e6ad972926b8"),
    //   "learning.activity.id": "641b05d414554842cd1b9371",
    // },
    // { $set: { "learning.$.activity": "Status Baru" } }
    // { arrayFilters: [{ "elem.id": "641b05d414554842cd1b9371" }] }
    // Learner.updateOne(
    //   { "learning.course": "641c45ed333cb1222087aa31" },
    //   {
    //     $set: {
    //       "learning.$[].activity.$[xxx].isComplete": true,
    //     },
    //   },
    //   { arrayFilters: [{ "xxx.id": "641b05d414554842cd1b9371" }] }
    // )
    Learner.updateOne(
      {
        user: req.params.id_learner,
        "learning.course": req.params.id_course,
      },
      {
        $set: {
          "learning.$[elem].activity": req.body,
        },
      },
      {
        arrayFilters: [{ "elem.course": req.params.id_course }],
      }
    )

      // .exec()
      .then(() => {
        //console.log("ok");
        return res.status(200).json({ module: req.body });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
