import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can choose any email service
            auth: {
                user: process.env.EMAIL_USERNAME,  // Use environment variables for sensitive information
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    
        const mailOptions = {
            from: `HeavenCare Medical Center <${process.env.EMAIL_USERNAME}>`, 
            to: options.email, 
            subject: options.subject, 
            text: options.message, 
        };
    
        await transporter.sendMail(mailOptions);
        console.log("Email sent:", mailOptions);
    } catch (error) {
        console.log("Email sending failed:", error);
        throw new Error("Email sending failed."); // Let this error bubble up
    }
};

export default sendEmail;
