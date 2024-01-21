const { sign, verify } = require("jsonwebtoken");

const createTokens = (user: any) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "jswsecretPlsChange"
  );
  return accessToken;
};

const validateToken = (req: any, res: any, next: any) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jswsecretPlsChange");
    if (validToken) {
      req.authenticated = true;
      return next()
    }
  } catch (err) {
    return res.status(400).json({error : err})
  }
};

module.exports = { createTokens, validateToken };
export {};
