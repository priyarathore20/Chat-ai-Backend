import Jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
//# sourceMappingURL=token-manager.js.map