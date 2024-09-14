import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


//Patient Registration

export const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, age} = req.body;

    if( !firstName || !lastName || !email || !phone || !password || !gender || !dob || !age){
        return next(new ErrorHandler("Please fill the entire form!", 400));
    }

    const user = await User.findOne({ email });

    if(user){
        return next(new ErrorHandler("User already Registered!", 400));
    }

    user = await User.create({firstName, lastName, email, phone, password, gender, dob, age, role: "Patient",});

    generateToken(user, "User Registered!", 200, res);
});



//All Login


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



//Add Admin by an Admin



export const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, age} = req.body;

    if( !firstName || !lastName || !email || !phone || !password || !gender || !dob || !age){
        return next(new ErrorHandler("Please provide all necessary details!", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists!`, 400));
    }

    const admin = await User.create({
        firstName, lastName, email, phone, password, gender, dob, age, role: "Admin",
    });

    res.status(200).json({
        success: true,
        message: "New Admin Registered!"
    });
});



//Get Current User Details



export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});



//Add new Doctor by Admin




export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const {docAvatar} = req.files;
    const allowedFormats = ["/image/png", "/image/jpeg", "/image/webp"];

    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const {firstName, lastName, email, phone, password, gender, dob, age, doctorDepartment} = req.body;

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !age || !doctorDepartment){
        return next(new ErrorHandler("Please provide full details!", 400));
    }

    const isRegistered = await User.findOne({email});

    if(!isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
            );
            return next(
            new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
            );
        }

    const doctor = await User.create({firstName, lastName, email, phone, password, gender, dob, age, role: "Doctor", 
        docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url, 
    }})

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});




//Get the list of all doctors



export const getAllDoctors = catchAsyncErrors(async(req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});




//Admin Logout


export const logoutAdmin = catchAsyncErrors(async(req, res, next) =>{
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new  Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out!"
    });
});



//Patient Logout

export const logoutPatient = catchAsyncErrors(async(req, res, next) =>{
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new  Date(Date.now()),
    }).json({
        success: true,
        message: "Patient logged out!"
    });
})

