import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pkg from 'jsonwebtoken';
// import rateLimit from "express-rate-limit"


dotenv.config();

const emailConfig = {
  service: 'gmail',
  auth: {
      user: process.env.PORTAL_EMAIL,
      pass: process.env.PORTAL_PASSWORD,
  },
};

export const generateEmail = async (mail, otp) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
      from: process.env.PORTAL_EMAIL,
      to: mail,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
  };

  try {
      await transporter.sendMail(mailOptions);
      return `OTP sent to ${mail} via email`;
  } catch (error) {
      throw `Error sending OTP to ${mail} via email: ${error}`;
  }
}




const { sign, verify } = pkg;

// const jwtSecretKey = "123456";

export const GenerateToken = ({ data, expiresIn }) => {
  //make the key more harder
  //expires in should also be from .env file
  //good approach
  return sign({ result: data}, process.env.JWT, {
            expiresIn: expiresIn
        })
};

export const VerifyEmailToken = (token) => {
  return verify(token, process.env.JWT);
};

// Generic rate limiter function
// export const createRateLimiter = (windowMs, maxRequests, message) => {
//   return rateLimit({
//       windowMs: windowMs,       // Time window in milliseconds
//       max: maxRequests,         // Maximum number of requests allowed
//       message: {
//           status: false,
//           message: message,
//           data: null
//       },
//       standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
//       legacyHeaders: false      // Disable the `X-RateLimit-*` headers
//   });
// };