
const Stripe = require("stripe");
const Purchase = require("../models/purchase.model");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        try {
            await Purchase.findOneAndUpdate(
                { stripeSessionId: session.id },
                { status: "success" }
            );
        } catch (err) {
            console.error("Error updating purchase:", err);
        }
    }

    res.status(200).json({ received: true });
};

module.exports = { stripeWebhook };
