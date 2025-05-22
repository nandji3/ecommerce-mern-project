const mongoose = require('mongoose');
const { MAX_RETRIES, RETRY_DELAY } = require('./constants');
const connectDB = async (retries = MAX_RETRIES) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.log(`❌ MongoDB connection failed: ${error.message}`);

        if (retries > 0) {
            console.log(`🔁 Retrying in ${RETRY_DELAY / 1000}s... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
            setTimeout(() => connectDB(retries - 1), RETRY_DELAY);
        } else {
            console.error('🚫 Could not connect to MongoDB after retries. Exiting...');
            process.exit(1);
        }
    }
};

module.exports = { connectDB };
