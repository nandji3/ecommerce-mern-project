const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
// const checkoutRoutes = require("./routes/checkout.routes");
// const webhookRoutes = require("./routes/webhook.routes");

dotenv.config();


const app = express();

app.use(cors());


app.use("/api/webhook", express.raw({ type: "application/json" }));


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api", checkoutRoutes);
// app.use("/api", webhookRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
