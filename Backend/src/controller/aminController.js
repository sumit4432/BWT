const slugify = require("slugify");
const contactProfileSchema = require("../models/contactProfileSchema");

// *********FETCHEING DATA OF CONTACT PROFILE ******************

exports.ContactProfileData = async (req, res) => {
  try {
    const FetchData = await contactProfileSchema.find();
    if (FetchData) {
      res.status(201).json({ FetchData });
    } else {
      res.status(400).json({ message: "Not Founf Data" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

// *************************FETCHINF DATA OF CONTACT PROFILE BY ID *************************

exports.getContactProfileById = async (req, res) => {
  try {
    const contatcProfile = await contactProfileSchema.findById(req.params.id);
    if (contatcProfile) {
      return res.status(200).json({ contatcProfile });
    } else {
      res.status(404).json({ message: "contact profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *****************************create data of contact Profile to amin pane  **********************

const createContactProFile = async (req, res) => {
  const { firstName, lastName, companyName } = req.body;
  try {
    const newProfile = new contactProfileSchema({
      firstName: firstName,
      slug: slugify(firstName),
      lastName,
      companyName,
    });

    const createdProfile = await newProfile.save();
    res.status(201).json({ data: createdProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//*********************  UPDATE CONTACT PROFILE**********************

exports.updateContactProfile = async (req, res) => {
  try {
    const { id } = req.params.id;
    const updateProfile = await contactProfileSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updateProfile) {
      res.status(200).json({
        data: updateProfile,
      });
    } else {
      res.status(404).json({ message: "update Profile Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ***************************DELETE CONTACT PROFILE*************************

exports.deleteContactProfile = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deleteContactProfile = await contactProfileSchema.findByIdAndDelete(
      sid
    );
    if (deleteContactProfile) {
      res
        .status(200)
        .json({ data: deleteContactProfile, msg: "Profile Deleted" });
    } else {
      res.status(404).json({ msg: "not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
