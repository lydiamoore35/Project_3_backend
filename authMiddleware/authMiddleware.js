//Get SECRET from .env
require('dotenv').config();
const {SECRET} = process.env;
//Bring in Json Web Token
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    if(req.headers.authorization){
      console.log('Hello From Auth Middleware');
      const token = req.headers.authorization.split(" ")[1];
      console.log(`Token: ${token}`);
      const payload = await jwt.verify(token, SECRET);
      console.log(`Payload: ${payload}`);
      if(payload) {
        req.payload = payload;
        next();
      } else {
        res.status(400).json({error: "Access Denied: Verification Failed or No Payload"})
      }
    } else {
      res.status(400).json({error: "Access Denied: No Authorization Header"})
    }
  } catch {
    res.status(400).json({error: "Access Denied"})
  }
}

module.exports = auth;