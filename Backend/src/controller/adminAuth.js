const jwt = require("jsonwebtoken");
const userSchema = require("../models/AuthSchema");
const { json } = require("body-parser");

// **********************AuthAdmin Sinup ****************

exports.Signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmpassword, role } =
    req.body;

  userSchema.findOne({ email: req.body.email });
  exec((error, validuser) => {
    if (validuser)
      return res.status(400).json({ message: "Admin Already Exists" });
  });

  const user = new userSchema({
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    role: Admin,
  });

  user.save((error, data) => {
    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(400).json({ message: "Something went worng" });
    }
  });
};

// *********************Admin Signin ****************************

exports.Singin = async (req, res) => {
  userSchema
    .findOne({ email: req.body.email })
    .exec(async (error, validuser) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (!user) {
        res.status(400).json({ message: "userNot found" });
      }
      try {
        const passwordMatch =
          (await user.authenticate(req.body.password)) && user.role == "Admin";
        if (passwordMatch) {
          const token = jwt.sign({ Id: user._id, role: user.role }, key, {
            expiresIn: "5h",
          });

          const { _id, firstName, lastName, email, password, confirmpassword } =
            user;
          res.status(200).json({
            token,
            user: {
              _id,
              firstName,
              lastName,
              email,
              password,
              confirmpassword,
              role: "Admin",
            },
          });
        } else {
          return res.status(400).json({ message: "Incorrect Password" });
        }
      } catch (error) {
        return res.status(400).json({ message: "Somthing went worng" });
      }
    });
};

// **********************Check Admin Authorizwe or not *********************

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("")[1];
    try {
      const token = jwt.verify(token, key);
      req.user = user;
      next();
    } catch (error) {
      return res.status(400), json({ error: "Invalid user" });
    }
  } else {
    return res.status(400).json({ error: " Not Authorize" });
  }
};

// *********************checkRole Admin ************************

exports.AdminRole = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(201).json({ message: "Unauthorize" });
  }
};
