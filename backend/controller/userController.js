import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


export const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role} = req.body;

    if( !firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role ){
        return next(new ErrorHandler("Please fill the entire form!", 400));
    }

    const user = await User.findOne({ email });

    if(user){
        return next(new ErrorHandler("User already Registered!", 400));
    }

    user = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role});

    generateToken(user, "User Registered!", 200, res);
});

export const login = catchAsyncErrors(async(req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    // Check if all required fields are provided
    if( !email || !password || !confirmPassword || !role ){
        return next(new ErrorHandler("Please provide all necessary details!", 400));
    }

    // Check if password and confirmPassword match
    if( password !== confirmPassword ){
        return next(new ErrorHandler("Confirm Password do not match !", 400));
    }


    // Find user by email
    const user = await User.findOne({email}).select("+password");

    // Check if user exists
    if(!user){
        return next(new ErrorHandler("Invalid User", 400));
    }

    // Compare provided password with stored hashed password
    const isPasswordMatched = await user.comparePassword(password);

    // Check if password matches
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password or email", 400));
    }

    // Check if the provided role matches the user's role
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found", 400));
    }

    generateToken(user, "User LoggedIn Successfully!", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic} = req.body;

    if( !firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please provide all necessary details!", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists!`, 400));
    }

    const admin = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin",
    });

    res.status(200).json({
        success: true,
        message: "New Admin Registered!"
    });
});

export const getAllDoctors = catchAsyncErrors(async(req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req, res, next) =>{
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new  Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out!"
    });
});

export const logoutPatient = catchAsyncErrors(async(req, res, next) =>{
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new  Date(Date.now()),
    }).json({
        success: true,
        message: "Patient logged out!"
    });
});