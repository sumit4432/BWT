const bcrypt = require("bcrypt");
const PostByRequirement = require("../models/postByRequestSchema");

exports.createPostByRequirements = async (req, res) => {
  try {
    const {
      name,
      producname,
      quantity,
      email,
      requiremnts_frquency,
      purposeOfReq,
      phone,
    } = req.body;

    const hash = await bcrypt.hash(phone, 10);
    const form = new PostByRequirement({
      name,
      producname,
      quantity,
      email,
      requiremnts_frquency,
      purposeOfReq,
      phone,
      hash,
      approved: false,
    });
    res.status(200).json({ form });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.GetForms = async (req, res) => {
  try {
    const forms = await PostByRequirement.find({ approved: true }).exec();
    res.status(200).json({ forms });
  } catch (error) {
    res.status(500).json({ message: "internal Error" });
  }
};
