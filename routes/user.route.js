const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
} = require("../controllers/users.controller");
const { verifyToken, isAdmin } = require("../middlwares/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middlwares/verifySignup");
const {
  checkIsValidUser,
  checkIsValidUpdate,
} = require("../middlwares/userValidator");

router.get("/", [verifyToken], getAllUsers);
router.get("/:id", [verifyToken], getUserById);

router.put("/me", [verifyToken, checkIsValidUpdate], updateProfileById);
router.put(
  "/role/:id",
  [verifyToken, isAdmin, checkRolesExisted],
  updateUserRoleById
);
router.post(
  "/",
  [
    verifyToken,
    isAdmin,
    checkDuplicatedEmail,
    checkRolesExisted,
    checkIsValidUser,
  ],
  createUser
);

module.exports = router;
