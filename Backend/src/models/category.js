const mongoose = require("mongoose");
const express = require("express");
const slug = require("slugifiy");

const CategoryModal = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    // categoryImage: { type: String },
    // parentId: {
    //   type: String,
    // },

    // type: {
    //   type: String,
    // },

    parentId: {
      type: String,
    },

    images: [
      {
        image: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);
const Category = new mongoose.model("AllCategory", CategoryModal);

module.exports = Category;
