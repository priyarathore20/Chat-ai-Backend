import Jwt from "jsonwebtoken";

export const createToken = (id: String, email: String, expiresIn) => {
  const payload = { id, email };
  const token = Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};
