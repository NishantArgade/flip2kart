import jwt from "jsonwebtoken";

export const generateToken = (user, secret, expire) => {
  const { first_name, last_name, email, phone, addresses, role, gender, _id } =
    user;

  return jwt.sign(
    {
      userID: _id,
      first_name,
      last_name,
      email,
      phone,
      addresses,
      role,
      gender,
    },
    secret,
    { expiresIn: expire }
  );
};

export const cookiesOption = (tokenExpire) => ({
  maxAge: tokenExpire,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "noon" : "Strict",
});

export const generateOTP = (digit = 4) => {
  const start = Math.pow(10, digit - 1);
  const end = Math.pow(10, digit) - 1;
  return Math.floor(start + Math.random() * (end - start + 1));
};

export function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0;

  const sum = ratings.reduce((a, b) => a + b, 0);
  const average = sum / ratings.length;
  return average.toFixed(1);
}
