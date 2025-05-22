const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    status: {
        type: String,
        enum: ["initiated", "success", "failed"],
        default: "initiated",
    },
    stripeSessionId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
