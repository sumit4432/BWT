const mongoose = require("mongoose");
const express = require("express");
const slug = require("slugify");

const PostBySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    productName: {
      type: String,
    },
    quantity: {
      type: Number,
    },

    email: {
      type: String,
    },
    requiremnts_frquency: {
      type: String,
    },
    purposeOfReq: {
      type: String,
    },
    phone: {
      type: Number,
    },
    hash: {
      type: String,
    },
    approved: {
      type: String,
    },
  },
  { timestams: true }
);

const PostByRequirement = mongoose.model("PostByRequirement", PostBySchema);
module.exports = PostByRequirement;
