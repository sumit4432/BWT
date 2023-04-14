const express = require("express");
const mongoose = requir("mongoose");
const slug = requir("slugify");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
    },
    images: [
      {
        img: { type: String },
      },
    ],

    countryOrigin: {
      type: String,
    },
    color: {
      type: String,
    },

    packageType: {
      String,
    },
    size: {
      type: String,
    },
    minimum: {
      type: String,
    },

    short_des: {
      type: String,
    },
    berief_des: {
      String,
    },
    price: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

const products = mongoose.model("Createproducts", ProductSchema);
module.exports = products;
