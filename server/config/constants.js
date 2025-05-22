module.exports = {
    MAX_RETRIES: parseInt(process.env.MAX_RETRIES) || 3,
    RETRY_DELAY: parseInt(process.env.RETRY_DELAY) || 3000,
};