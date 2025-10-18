import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'
import bcrypt, { compare } from "bcryptjs";
import { generateEmail, GenerateToken, VerifyEmailToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'

// export const register = async (req, res, next) => {

//     const { username, email, password } = req.body

//     if (!username || !email || !password) return errorHandler(res, 400, "missing fields")

//     try {

//         const user = await User.findOne({ $or: [{ email: email }, { userName: username }] })
//         if (user) {

//             return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
//         }
//         if (password.length < 8) {
//             return errorHandler(res, 400, "Password length should be minimum 8 characters long")

//         }




//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(password, salt);

//         const doc = await User({
//             username,
//             email,
//             password: hash
//         })


//         const otp = nanoid().slice(0, 6)
//         doc.otp = otp
//         doc.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
//         doc.isVerified = false

//         let savedUser = await doc.save();

//         const token = GenerateToken({ data: savedUser, expiresIn: '10m' });

//         if (savedUser) {
//             const emailSent = await generateEmail(email, otp)

//             return successHandler(res, 200, "Signed up Successfully, OTP send to your email address please verify", { ...savedUser, token: token })
//         } else {
//             return errorHandler(res, 500, "User did not saved")
//         }

//     } catch (error) {
//         errorHandler(res, 500, error.message)
//     }
// }





export const login = async (req, res, next) => {


    try {
        if (!req.body.username || !req.body.password) {
            // return errorHandler(res, 400, "missing fields");
            return errorHandler(res, 400, "missing fields")
        }

        // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
        const isExists = await User.findOne({ username: req.body.username })



        if (!isExists) {
            return errorHandler(res, 400, "Invalid Credentials")
        }
        const isPasswordCorrect = await compare(
            req.body.password, isExists.password
        );
        if (!isPasswordCorrect) {
            return errorHandler(res, 400, "Invalid Credentials")
        }

        // const isVerified = await User.findOne({ isVerified: true, username: req.body.username })
        // if (!isVerified) return errorHandler(res, 403, "Account already exist. Verify your account")



        const token = jwt.sign({ id: isExists._id, username: isExists.username, isAdmin: isExists.isAdmin }, process.env.JWT, {
            expiresIn: '7d'
        })

        const { password, ...otherDetails } = isExists._doc


        res.status(200).json({
            success: true,
            status: 200,
            token: token,
            data: { ...otherDetails },
            message: 'user loggedin successfully'


        })


    } catch (error) {
        errorHandler(res, 404, error.message)
    }
}

export const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};



export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const token = req.header('Authorization');

    try {
        if (!token || !token.startsWith('Bearer')) {
            return errorHandler(res, 401, "No token provided");
        }

        const tokenString = token.split(" ")[1];

        let verifyingUser;
        try {
         verifyingUser = VerifyEmailToken(tokenString); 
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return errorHandler(res, 401, "Token has expired");
            }
            return errorHandler(res, 400, "Invalid token");
        }

        if (!verifyingUser) {
            return errorHandler(res, 404, "Invalid or expired verification data");
        }

        const userDetails = await User.findOne({
            _id: verifyingUser.result._id,
            otp,
            otpExpires: { $gt: new Date() }
        });

        if (!userDetails) {
            return errorHandler(res, 400, "OTP is invalid or expired");
        }

        await User.findByIdAndUpdate(userDetails._id, {
            isVerified: true,
            $unset: {
                otp: "",
                otpExpires: ""
            }
        });

        return res.status(200).json({ success: true, message: "OTP verified successfully" });

    } catch (error) {
        console.error("Server Error:", error);
        return errorHandler(res, 500, "Something went wrong");
    }
}






export const register = async (req, res, next) => {

    const { username, email, password } = req.body
    if (!username || !email || !password) return errorHandler(res, 400, "missing fields")

    try {
        const user = await User.findOne({ $or: [{ email: email }, { userName: username }] })
        if (user) {

            return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
        }
        if (password.length < 8) {
            return errorHandler(res, 400, "Password length should be minimum 8 characters long")

        }
         const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const doc = await User({
            username,
            email,
            password: hash
        })
        let savedUser = await doc.save();
       
        
            return successHandler(res, 200, "user registered successfully", savedUser )
       

    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}