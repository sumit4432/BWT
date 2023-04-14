const express = require("express");
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAuth",
    require: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },

  city: {
    type: String,
  },
  address: {
    type: String,
  },

  landmark: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  altPhone: {
    type: String,
  },
  AltEmail: {
    type: String,
  },
  yearofEst: {
    type: Number,
  },
  businessType: {
    type: String,
  },
  owershipType: {
    type: String,
  },

  empolyeeStrength: {
    type: String,
  },
  annualTurnOver: {
    type: String,
  },

  facebookLink: {
    type: String,
  },
  instragramLink: {
    type: String,
  },
  companyDecs: {
    type: String,
  },
  ifscCode: {
    type: String,
  },

  accNum: {
    type: String,
  },
  accType: {
    type: String,
  },
  images: {
    type: String,
  },
  accountManger: {
    type: String,
  },
});
const contactProfileSchema = mongoose.model(
  "contactProfileSchema",
  contactSchema
);
module.exports = contactProfileSchema;
