import User from "../models/userModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllUsers = async (req, res) => {
    const { username, email, isAdmin } = req.query;
    const filter = {};
    if (username) filter.username = username;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
    try {
        const userData = await User.find(filter);
        successHandler(res, 200, "All users fetched", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        successHandler(res, 200, "User found successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "User deleted successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updateUser = async (req, res) => {
    
    try {
        const file = req.file
        if(file) {
              const url = await uploadOnCloudinary(file,'user-images');
              req.body.profilePic = url.secure_url
        }
        const userData = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "User updated successfully", userData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
