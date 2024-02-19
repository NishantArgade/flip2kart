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

export const generateOTP = (digit = 4) => {
  const start = Math.pow(10, digit - 1);
  const end = Math.pow(10, digit) - 1;
  return Math.floor(start + Math.random() * (end - start + 1));
};
