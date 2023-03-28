const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Learner = require("../models/learner");
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const id = new mongoose.Types.ObjectId();

    const user = new User({
      _id: id,
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      role: req.body.user_role,
    });
    //add to learner
    if (req.body.user_role.toUpperCase() == "LEARNER") {
      try {
        const learner = new Learner({
          user: id,
        });
        learner.save();
      } catch (error) {
        res.status(400).json({
          error: error,
        });
      }
    }
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ error: "Email and Password are required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "RANDOM_TOKEN_SECRET",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      //user.token = token;

      // user
      return res.status(200).json({
        userId: user._id,
        role: user.role,
        token: token,
      });
    }
    return res.status(400).json({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
  // User.findOne({ email: req.body.email })

  //   .then((user) => {
  //     if (!user) {
  //       return res.status(401).json({ error: "User not found" });
  //     }
  //     bcrypt
  //       .compare(req.body.password, user.password)
  //       .then((valid) => {
  //         if (!valid) {
  //           return res.status(401).json({ error: "Incorrect Password" });
  //         }
  //         //   res.status(200).json({
  //         //     userId: user._id,
  //         //     token: "token",
  //         //   });
  //         const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
  //           expiresIn: "2h",
  //         });
  //         res.status(200).json({
  //           userId: user._id,
  //           role: user.role,
  //           token: token,
  //         });
  //       })
  //       .catch((error) => {
  //         res.status(500).json({
  //           error: error,
  //         });
  //       });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       error: error,
  //     });
  //   });
};

exports.getAllUser = (req, res, next) => {
  User.find()
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
