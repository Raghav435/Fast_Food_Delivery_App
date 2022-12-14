const router = require("express").Router();

const {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getOrderById,
  actualizeOrderState,
  deleteOrderById,
} = require("../controllers/order.controller");

const {
  verifyToken,
  isAdmin,
  isAdminOrIsModerator,
} = require("../middlwares/authJwt");
const {
  checkOrderExist,
  checkProfileState,
  checkAllowedDelete,
  checkAllowedUpdates,
  checkAuthorizedUser,
} = require("../middlwares/verifyOrder");
const checkIsValidId = require("../middlwares/checkValidid");

router.get("/", [verifyToken, isAdminOrIsModerator], getAllOrders);
router.post("/", [verifyToken, checkProfileState], createOrder);
router.get("/:id", [verifyToken, checkIsValidId], getOrderById);
router.put(
  "/:id",
  [verifyToken, isAdminOrIsModerator, checkOrderExist, checkAllowedUpdates],
  actualizeOrderState
);
router.delete("/:id", [verifyToken, checkAllowedDelete], deleteOrderById);
router.get(
  "/user/:userId",
  [verifyToken, checkAuthorizedUser],
  getAllUserOrders
);

module.exports = router;
