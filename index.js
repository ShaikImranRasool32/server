const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path'); 
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const sendMail = require('./utils/sendMail');
const companiesmodel = require('./models/companies');
const companiesRouter = require('./routes/companyRoutes'); // Import the new route
const multer = require('multer');
const csv = require('csvtojson');
const studentmodel = require('./models/student'); // Import your student model
const sendotp = require('./utils/sendotp')
const userotp = require('./models/userotp')
const generateotp = require('./utils/generateotp');
const Useri = require('./models/Useri');


// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json()); // Parse JSON bodies

// Connection with DB
db.once('open', () => {
    console.log('Database connection is open.');
});

app.get('/api/companies', (req, res) => {
    companiesmodel.find()
        .lean()
        .then(companies => res.json(companies))
        .catch(error => res.json(error));     
});

app.use('/api/companies', companiesRouter);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use('/uploads', express.static('uploads'));

const upload = multer({ storage });

app.post('/uploadcsv', upload.single("csvFile"), async (req, res) => {
    try {
        const up = await csv().fromFile(req.file.path);
        await studentmodel.insertMany(up);
        console.log("Added to Database");
        return res.send("Added to Database Successfully");
    } catch (error) {
        console.error("Error adding data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post('/api/sendotp', async (req, res) => {
    const { semail } = req.body;

    try {
        // Generate OTP
        const aotp = generateotp();

        // Save OTP to the database
        await userotp.create({ email: semail, otp: aotp, createdAt: Date.now() });

        // Send OTP via email
        const sent_to = semail;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = semail;
        const rotp = aotp;
        await sendotp(rotp, sent_to, sent_from, reply_to);

        res.status(200).json({ success: true, message: "OTP Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send OTP Email" });
    }
});
app.post('/api/verifyotp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user by email
        const user = await userotp.findOne({ email });

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare OTPs
        const storedOtp = user.otp;
        if (otp === storedOtp) {
            // Correct OTP, delete OTP record
            await userotp.deleteOne({ email });
            return res.status(200).json({ success: true, message: "OTP verification successful" });
        } else {
            // Incorrect OTP
            return res.status(400).json({ error: "Incorrect OTP" });
        }
    } catch (err) {
        console.error("Error in verifyotp:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});





// API Routes
app.post('/api/sendMail', async (req, res) => {
    const { email, message, subject } = req.body;

    try {
        const sent_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        const mailsubject = subject;
        const textMessage = message;

        await sendMail(mailsubject, textMessage, sent_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for handling 404 errors 
app.use((req, res) => { 
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); 
}); 


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`KLU Server is Launch on port ${PORT}`);
});
