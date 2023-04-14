const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const UserSchema = require("../models/AuthSchema");

// *******************SignUpController**********************

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  UserSchema.findOne({ email: req.body.email }).exec((error, validuser) => {
    if (validuser) {
      return res.status(400).json({ message: "User already exists" });
    }
  });
  const user = new UserSchema({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
  });
  user.save((error, data) => {
    if (data) {
      return res.status(201).json({ data });
    } else {
      return res.status(400).json({ message: "something went worng" });
    }
  });
};

// ************************Singin***************************

exports.signin = async (req, res) => {
  UserSchema.findOne({ email: req.body.email }).exec((error, user) => {
    if (data) {
      res.status(201).json({ user });
    }
    if (!user) res.status(400).json({ message: "user not found" });

    try {
      const passwordmatch = await.user.authenticate(req.body.password);
      if (passwordmatch) {
        const token = jwt.sign({ _id: user._id, role: user.role }, key, {
          expiresIn: "5h",
        });

        const { _id, firstName, lastName, email, password, confirmPassword } =
          user;
        res.status(200).json({
          user: {
            _id,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role: user.role,
          },
        });
      } else {
        return res.status(400).json({ message: "Incorrect Password" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Something went worng" });
    }
  });
};

// ***************************** UserUpdate Role **************************

exports.updateRole = async (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) {
    return res.status(400).json({ message: "Invalide user parameter" });
  }

  //***************************************updateUer role in data base ********************************/

  const updateUser = await UserSchema.findOneAndUpdate(
    { _id: userId },
    { role: role },
    { new: true }
  );
  if (!updateUser) {
    return res.status(400).json({ error: "Faild to udate user role" });
  }
  // *******************************genrate a new token for userUpdate***********************************

  const newToken = jwt.sign(
    { user: { id: updateUser._Id, role: updateUser.role } },
    key,
    { expiresIn: "1h" }
  );
  return res
    .status(200)
    .json({ success: true, user: updateUser, token: newToken });
};

//  *************************GetAllUser*****************************

exports.getAllUser = async (req, res) => {
  try {
    const User = await UserSchema.find();
    res.status(200).json({ User });
    console.log("User", User);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// **********************Check Role *******************************

exports.checkRole = (roles) => (req, res, next) => {
  try {
    const token = req.headers.authorization.spilt("")[1];
    const decodeToken = jwt.verify(token, key);
    const user = decodeToken.user.role;
    console.log("Decode user", user);

    if (roles.includes(user)) {
      next();
    } else {
      next(new Error("unauthorized"));
    }
  } catch (error) {
    next();
  }
};
