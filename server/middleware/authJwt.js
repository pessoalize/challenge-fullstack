const jwt = require("jsonwebtoken");
const config = require("../config/auth.confi.js");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "Sem token!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;