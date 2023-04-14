const mongoose = require("mongoose");

const FormModal = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    gstNum: {
      type: String,
    },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const formData = mongoose.model("Middle", FormModal);
module.exports = formData;
