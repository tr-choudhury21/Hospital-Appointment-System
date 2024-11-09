
# Hospital Appointment System 🏥

A full-stack Hospital Appointment System built with the MERN stack. This application allows patients to book appointments with doctors, and gives admins the ability to manage doctor registrations and appointment approvals.



## Features

- **Patient Booking**: Patients can select a doctor and schedule appointments.
- **Admin Controls**: Admins can register new doctors, approve/reject appointments, and view activities in a dedicated dashboard.
- **JWT Authentication**: Secure authentication for both patients and admins.
- **Email Notifications**: Nodemailer integration for appointment confirmation and status updates.

## Tech Stack

- **Frontend**: React

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (Json Web Token)
- **Notifications**: Nodemailer


## Installation & Setup

Clone the repository

```bash
  git clone https://github.com/tr-choudhury21/Hospital-Appointment-System.git
```
    
Install Dependencies for both client and server

```bash
    cd backend
    npm install
```
```bash
    cd ../frontend
    npm install
```

Start the server for both backend and frontend

```bash
    npm run dev
```

For accessing the frontend visit `http://localhost:5173`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI = <your-database-connection-string>`

`FRONTEND_URL`

`DASHBOARD_URL`

`JWT_SECRET_KEY`

`JWT_EXPIRES`

`COOKIE_EXPIRE`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_SECRET`

`CLOUDINARY_API_KEY`

`EMAIL_USERNAME`

`EMAIL_PASSWORD`






## Usage

 **1. Patient:**  Signup/Login to book appointment with doctor.
 
 **2. Admin:** Login to manage doctors and approve/reject appointments via admin dashboard.

 ## Future Enhancement

 - Video Consultation

 - Online Prescription Management

 - Medication Ordering System


## Contributing

Contributions are always welcome!

- Fork the project.

- Create a new branch
```bash
    git checkout -b feature/AmazingFeature
```
- Commit your changes
```bash
    git commit -m 'Add some new features'
```
- Push to the branch
```bash
    git push origin feature/AmazingFeature
```
- Open a pull request


Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at tituraychoudhury@gmail.com

