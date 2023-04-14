const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified(password)) {
    return next();
  }

  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return resizeBy.status(404).json({ error });
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("UserAuth", userSchema);
