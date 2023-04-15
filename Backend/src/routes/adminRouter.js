const express = require("express");
const {
  Signup,
  Singin,
  requireSignin,
  AdminRole,
} = require("../controller/adminAuth");
const {
  getContactProfileById,
  ContactProfileData,
  createContactProFile,
  updateContactProfile,
  deleteContactProfile,
} = require("../controller/aminController");
const Router = express.Router();

Router.route("/adminsignup").post(Signup);
Router.route("/adminsignin").post(Singin);

Router.post("/profile", requireSignin, AdminRole, (req, res) => {
  res.status(201).json({ message: "profile" });
});
Router.get("/GetContactProfile", requireSignin, ContactProfileData);
Router.get("GetContactProfileById/:id", getContactProfileById);
Router.post("/createContactProfile", createContactProFile);
Router.put("/UpdateContactProfile/:id", updateContactProfile);
Router.delete("/deleteContactProfile/:id", deleteContactProfile);

module.exports = Router;
