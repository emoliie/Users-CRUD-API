// on appelle la librairie jsonwebtoken

const jwt = require("jsonwebtoken");

// on genere un token en rentrant un email
function generateAccessToken(email) {
  return jwt.sign(
    {
      data: email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "3h",
    }
  );
}

// on exporte le token
module.exports = {
  generateAccessToken,
};
