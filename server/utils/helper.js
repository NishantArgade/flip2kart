import jwt from "jsonwebtoken";

export const generateToken = (user, secret, expire) => {
  return jwt.sign(
    {
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userEmail: user.email,
    },
    secret,
    { expiresIn: expire }
  );
};

export const cookiesOption = (tokenExpire) => ({
  maxAge: tokenExpire,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
});
