const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connection = require("./config/db");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));

const productsRouter = require("./routes/product.route");
const usersRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const contactRouter = require("./routes/contact.route");
const newsletterRouter = require("./routes/newsletter.route");
const ordersRouter = require("./routes/order.route");
const categoriesRouter = require("./routes/categories.route");

app.use("/media", express.static(path.join(__dirname, "storage", "media")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get(" * ", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "../frontend")));
}

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database succesfully");
  } catch (err) {
    console.log("Something error in connection");
  }
  console.log(`Server is lestening on ${PORT}`);
});
