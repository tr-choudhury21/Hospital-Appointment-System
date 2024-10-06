import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import sendEmail from "../utils/email.js";

export const postAppointment = catchAsyncErrors(async(req, res, next) => {
    
    const {firstName, lastName, email, phone, age, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;

    if (
        !firstName || !lastName || !email || !phone || !age || !dob || !gender || !appointment_date || !department || !address) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404));
    }
    
    if (isConflict.length > 1) {
        return next(
            new ErrorHandler( "Doctors Conflict! Please Contact Through Email Or Phone!",400)
        )
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({ firstName, lastName, email, phone, age, dob, gender, appointment_date, department,
    doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
    }, hasVisited, address, doctorId, patientId,
    });
    
    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Send!",
    });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    
    const appointments = await Appointment.find();
    const appointmentsCount = await Appointment.countDocuments();
    
    res.status(200).json({
        success: true,
        appointments,
        appointmentsCount
    });
});

export const getDoctorAppointments = catchAsyncErrors(async (req, res, next) => {
    // Assuming doctorId is available in req.user from JWT authentication middleware
    const doctorId = req.user._id;

    // Fetch appointments assigned to the logged-in doctor
    const appointments = await Appointment.find({ doctor: doctorId });

    res.status(200).json({
        success: true,
        appointments,
    });
});


export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    
    const { id } = req.params;

    let appointment = await Appointment.findById(id).populate("patientId", "email firstName lastName");

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    const patientEmail = appointment.patientId.email;
    const patientName = `${appointment.patientId.firstName} ${appointment.patientId.lastName}`;
    const doctorName = `${appointment.doctor.firstName} ${appointment.doctor.lastName}`;
    const message = `Dear ${patientName}, your appointment with Dr. ${doctorName} has been updated to '${appointment.status}'. Please check your account for more details.`;

    try {
        // Call the sendEmail function to send the notification
        await sendEmail({
            email: patientEmail,   // The patient's email
            subject: `Appointment Status Updated: ${appointment.status}`,
            message,  // The constructed message
        });
        console.log("Email sent successfully");
    } catch (error) {
        return next(new ErrorHandler("Failed to send email notification.", 500));
    }

    res.status(200).json({
        success: true,
        message: "Appointment status updated and patient notified via email.",
    });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    
    await appointment.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    });
});
