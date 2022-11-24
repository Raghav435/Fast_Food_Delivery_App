const mongoose = require("mongoose");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { Order } = require("../models/order.model");
const orderFactory = require("../utils/orderGenerator");
const { orderEmitter } = require("../config/io");

const getAllOrders = async (req, res) => {
  let query = {};
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.orderID) {
    query.orderID = parseInt(req.query.orderID);
  }
  if (req.query.state) {
    if (req.query.state === "finish") {
      query.finished = true;
    }
    if (req.query.state === "unfinished") {
      query.finished = false;
    }
  }
  if (req.query.sort) {
    sort = req.query.sort;
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const orders = await Order.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("client")
      .exec();
    const totalResults = await Order.find(query);

    return res
      .status(200)
      .json({ successful: true, data: orders, total: totalResults.length });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't get orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderFound = await Order.findById(req.params.id)
      .populate("client")
      .exec();

    return res.status(200).json({ successful: true, data: orderFound });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, the state couldn't get order",
    });
  }
};

const getAllUserOrders = async (req, res) => {
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const user = await User.findById(req.params.userId);

    const ordersFound = await Order.find({ _id: { $in: user.orders } })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("client")
      .exec();

    return res.status(200).json({
      successful: true,
      data: ordersFound,
      total: user.orders.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong,  couldn't get user orders",
    });
  }
};
