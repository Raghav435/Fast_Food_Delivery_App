const router = require("express").Router();

const {
  checkDuplicatedCategory,
  checkCategoryExist,
} = require("../middlwares/verifyCategory");
const { verifyToken, isAdmin } = require("../middlwares/authJwt");
const {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
} = require("../controllers/category.controller");

router.get("/", getAllCategories);
router.post(
  "/",
  [verifyToken, isAdmin, checkDuplicatedCategory],
  createCategory
);
router.put(
  "/:id",
  [verifyToken, isAdmin, checkCategoryExist],
  editCategoryName
);
router.delete(
  "/:id",
  [verifyToken, isAdmin, checkCategoryExist],
  deleteCategory
);

module.exports = router;
