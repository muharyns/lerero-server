const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const learnCtrl = require("../controllers/learn");

router.get("/", learnCtrl.getAllStuff);
router.get("/course", learnCtrl.getAllCourse);

router.delete("/course/:id", learnCtrl.deleteCourse);
router.get("/coursedetail/:id_course", learnCtrl.getModuleAgg);
router.get("/module", learnCtrl.getAllModule);

router.get("/moduletoadd/:id_course", learnCtrl.getModuletoAdd);

router.get("/activity/", learnCtrl.getAllActivity);
router.get("/learneragg/:id_user", learnCtrl.getLearnerAgg);
router.get("/activitytoadd/:id_module", learnCtrl.getActivitytoAdd);
router.get("/dataactivity/:mod_name", learnCtrl.getActivity);

router.patch("/module/:id", learnCtrl.modifyModule);
router.get("/module", learnCtrl.getAllModule);
router.delete("/module/:id", learnCtrl.deleteModule);

router.delete("/activity/:id", learnCtrl.deleteActivity);
router.patch("/activity/:id/:module_id", learnCtrl.addActivity);
//router.put("/updateLearningStatus/:id_learner", learnCtrl.modifyLearningPath);
router.get("/getLearning/:id_learner", learnCtrl.modifyLearningPath);

router.get("/getPathLearner/", learnCtrl.getPathLearner);
router.get("/getactivity", learnCtrl.getLearnerActivity);

router.get("/learnertoassign/:id_course", learnCtrl.getLearnertoAssign);

//
router.put("/addActivityLearner/:id_learner", learnCtrl.addActivityLearner);
router.put(
  "/updatelearnerpath/:id_learner/:id_course",
  learnCtrl.modifyLearnerPath
);
router.post("/course", learnCtrl.createCourse);
router.post("/module", learnCtrl.createModule);
router.patch("/assigncourse/", learnCtrl.AssignCourse);
router.patch("/addmodule/", learnCtrl.addModule);
router.patch("/addactivity/", learnCtrl.addActivity);
router.put("/course/:id", learnCtrl.modifyCourse);
router.post("/activity", learnCtrl.createActivity);
router.put("/activity/:id", learnCtrl.modifyActivity);

module.exports = router;
