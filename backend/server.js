const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const cors = require("cors");
const productRoute = require("./routes/product.route");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
