const { default: slugify } = require("slugify");
const AllCategory = require("../models/category");
const ProductsSchema = require("../models/productSchema");
const userSchema = require("../models/AuthSchema");
const FormData = require("../models/formMiddleSchema");

const { json } = require("body-parser");
const contactProfileSchema = require("../models/contactProfileSchema");
const formData = require("../models/formMiddleSchema");

// ****************Add category**********************

function addCategories(categories, parentId = null) {
  const categoriesList = [];
  let category;
  if (parentId === nul) {
    category = categories.filter((cat) => {
      cat.parentId === undefined;
    });
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }

  for (let cate of category) {
    categoriesList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: addCategories(categories, cate.id),
    });
  }
  return categoriesList;
}

// ********************crreate category **********************

exports.createCategory = async (req, res, next) => {
  const createObject = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    createObject.parentId = req.body.parentId;
  } else {
    createObject.parentId = null;
  }
  let image = [];
  if (req.files && req.files.length > 0) {
    image = req.files.map((file) => {
      return { images: file.filename };
    });
    createObject.image = image;
  }

  // ***************************checking Parentid already Exists **************

  const existsBySlug = await AllCategory(createObject);
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ category });
    }
  });
};

// *************  particular category **********************

exports.getCateg0ries = async (req, res) => {
  try {
    const categories = await AllCategory.find({});
    const categoryList = addCategories(categories);
    res.status(200).json({ categoryList });
  } catch (error) {
    return resizeBy.status(400).json({ error });
  }
};

// ************** Update Category ***********************

exports.updateCategory = async (req, res) => {
  const { name, parentId } = req.body;
  const { categoryId } = req.params;

  try {
    const updateCategory = await AllCategory.findByIdAndUpdate(
      categoryId,
      { name: parentId },
      { new: true }
    );

    if (!updateCategory) {
      return res
        .status(400)
        .json({ error: "Could not update category, try again" });
    } else {
      res.status(200).json({ updateCategory });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// ********************* validator **************************

exports.createCategory = async (req, res, next) => {
  await body("name").noEmpty().withMessage("name is requir").run(req);
  await body("name")
    .custom(async (value) => {
      const existingCategory = await AllCategory.findOne({ name: value });
      if (existingCategory) {
        throw new errors("category name already Exisit");
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const createObject = {
  name: req.body.name,
  slug: slugify(req.body.name),
};

if (req.body.parentId) {
  createObject.parentId = req.body.parentId;
} else {
  createObject, (parentId = null);
}

let image = [];

image = req.files
  ? req.files.map((fiel) => {
      return { image: file.filename };
    })
  : [];

createObject.image = req.files
  ? req.files.map((file) => {
      return { image: file.filename };
    })
  : [];

// **********check category with parentid **********************

const existsBySlug = await AllCategory.findOne({
  slug: createObject.slug,
});
if (existsBySlug) {
  return res
    .status(400)
    .json({ message: "A category with same slug already exists" });
}

const cat = new AllCategory(createObject);
cat.save((error, category) => {
  if (error) {
    return res.status(400).json({ error });
  } else {
    res.status(200).json({ category });
  }
});

// ***************GET ALL PRODUCTS ***************************

exports.getAllProducts = async (req, res) => {
  try {
    const Allproducts = await createProducts.find();
    if (!Allproducts) {
      res.status(201);
    } else {
      res.status(201).json({ Allproducts, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Data is not Found" });
  }
};

// *************** SingleProduct ***************************

exports.getSingleProducts = async (req, res) => {
  try {
    const SingleProduct = await ProductsSchema.find();
    if (!SingleProduct) {
      res.status(201);
    } else {
      res.status(201).json({
        SingleProduct,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// *****************contactProfile **************************

exports.contactProfile = async (req, res) => {
  const userId = req.body;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Profile does not match" });
    }
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
    } = req.body;

    const updateData = {
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
      image,
      accType,
    };
    const data = await contactProfileSchema.findOneAndUpdate(
      { userId: userId },
      updateData,
      { new: true, upsert: true }
    );

    data.save();
    res
      .status(201)
      .json({ message: "Cotact profile update succesfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ e9rror: "internal server error" });
  }
};

// **************update contactProfile Data *********************

exports.GetUserByLogin = async (req, res) => {
  const userId = req.user._id;
  if (!usrId) {
    res.status(401).json({ error: "Please Login" });
  } else {
    try {
      const data = await contactProfileSchema.findOne({ userId: userId });
      if (data) {
        res.status(201).json({ data });
      } else {
        res.status(401).json({ error: "user not found" });
      }
    } catch {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// ****************middleware  here seller formdata**************************

exports.setMiddlewareSubmission = async (req, res, next) => {
  const userId = req.body._id;

  try {
    const user = await FormData.findOne({ userId }).exec();
    if (user) {
      next();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *****************SubmitFormCheck ****************************

exports.SubmitForm = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      const { name, gstnumb, email } = req.body;
      const data = new formData({ name, gstnumb, email, userId });
      await data.save();
      res.status({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ********************getUperFormDta Check **********************

exports.getUserFormDetails = async (req, res) => {
  const userId = req.userId._id;
  if (!userId) {
    res.status(404).json({ message: "Plase login" });
  }
  try {
    const data = await formData.findOne({ userINFO: userId });
    if (data) {
      res.status(201).json({ data });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal server Error" });
  }
};
