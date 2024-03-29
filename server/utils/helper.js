import jwt from "jsonwebtoken";

export const generateToken = (user, secret, expire) => {
  return jwt.sign(
    {
      userID: user?._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      addresses: user?.addresses,
      role: user?.role,
      gender: user?.gender,
    },
    secret,
    { expiresIn: expire }
  );
};

export const cookiesOption = (tokenExpire) => ({
  maxAge: tokenExpire,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
});

export const generateOTP = (digit = 4) => {
  const start = Math.pow(10, digit - 1);
  const end = Math.pow(10, digit) - 1;
  return Math.floor(start + Math.random() * (end - start + 1));
};

export function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0;

  ratings = ratings.map((r) => parseFloat(r));

  const sum = ratings.reduce((a, b) => a + b, 0);
  const average = sum / ratings.length;
  return average.toFixed(1);
}
