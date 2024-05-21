// fonction prend en param le token et verifie si token valide ou pas

const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
require("dotenv").config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Trying to authenticate with token " + token);

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    // payload : data stocké dans le token
    console.log(err);

    if (err) {
      return res.sendStatus(403);
    }

    const email = payload.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
}

module.exports = { authMiddleware };
