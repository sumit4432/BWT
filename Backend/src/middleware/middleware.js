const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const contactProfileSchema = require("../models/contactProfileSchema");

// ****************SignIn Authorization check and **************************

exports.requireSignin = (req, res, next) => {
  if (req.headers.Authrozation) {
    const token = req.headers.Authrozation.split("")[1];
    try {
      const user = jwt.verify(token, key);
      req.user = user;
      return next();
    } catch (error) {
      res.status(404).json({ error: "Unvalid token" });
    }
  } else {
    res.status(401).json({ messgae: "unauthoriza user" });
  }
};

// ******************************Check ROle  user is valid or not ************************

exports.checkRole = (roles) => {
  return (req, res, next) => {
    // console.log('rea.user:', req.user)

    if (req.user && req.user.role && roles.includes(req.user.role)) {
      // console.log(req.user) chekin
      next();
    } else {
      console.log("user role is not difine");
      res.status(401).json({ messgae: "user is not authorize" });
    }
  };
};

//******************************** Check AdminMidaleWare Authorix=ze or not ********************************

exports.adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    res.status(401).json({ messgae: "Access Denies" });
  } else {
    next();
  }
};

// *************************** Genrate Key ********************************

exports.genrateKey = (req, res, next) => {
  const key = uuid.v4();
  req.body.key = key;
  next();
};

// *************************************Submit Form Data ***********************************
exports.submutFoem = async (req, res, next) => {
  const {
    firstName,
    lastName,
    companyName,
    country,
    state,
    city,
    address,
    landmark,
    zipcode,
    phone,
    email,
    altPhone,
    AltEmail,
    yearofEst,
    businessType,
    owershipType,
    empolyeeStrength,
    annualTurnOver,
    facebookLink,
    instragramLink,
    companyDecs,
    ifscCode,
    accNum,
    accType,
    images,
    accountManger,
  } = req.body;

  const data = await contactProfileSchema({
    key: req.body.key,
    firstName,
    lastName,
    companyName,
    country,
    state,
    city,
    address,
    landmark,
    zipcode,
    phone,
    email,
    altPhone,
    AltEmail,
    yearofEst,
    businessType,
    owershipType,
    empolyeeStrength,
    annualTurnOver,
    facebookLink,
    instragramLink,
    companyDecs,
    ifscCode,
    accNum,
    accType,
    images,
    accountManger,
  });

  data.save((error, data) => {
    if (error) {
      res.status(401).json({ error });
    }
    if (data) {
      res.status(201).json({ data });
    }
  });
};
