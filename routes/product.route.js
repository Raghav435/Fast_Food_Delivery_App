const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const {
  getAllProducts,
  getProductById,
  postNewProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");
const { verifyToken, isAdmin } = require("../middlwares/authJwt");

const checkCategoryExist = require("../middlwares/verifyProduct");
const checkIsValidId = require("../middlwares/checkValidid");
//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/storage/media");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});

router.get("/", getAllProducts);

router.get("/:id", [checkIsValidId], getProductById);

router.post(
  "/",
  [verifyToken, isAdmin, upload.single("img"), checkCategoryExist],
  postNewProduct
);

router.put(
  "/:id",
  [verifyToken, isAdmin, upload.single("img"), checkCategoryExist],
  updateProductById
);

router.delete("/:id", [verifyToken, isAdmin], deleteProductById);

module.exports = router;
