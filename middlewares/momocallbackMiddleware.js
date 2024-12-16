// backend/middlewares/momoCallbackMiddleware.js
const verifyMomoSignature = (req, res, next) => {
    const signature = req.headers['momo-signature'];
    // Implement signature verification logic based on MTN's guidelines
    // If valid, proceed; else, reject the request
    next();
  };
  
  module.exports = { verifyMomoSignature };
  