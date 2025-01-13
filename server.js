const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'donateform.html'));
});


app.use(express.static(__dirname));


//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/donationDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// Define schemas
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
// Donation Schema

const donationSchema = new mongoose.Schema({
   option:String,
    first_N: String,
    last_N: String,
    email: String,
    phone_N:Number
});
const Donation = mongoose.model('Donation', donationSchema);

app.post("/submitDonation", async (req, res) => {
    console.log("Received data:", req.body); // Log received data
    try {
        const newDonation = new Donation({
            option: req.body.option,
            first_N: req.body.first_N,
            last_N: req.body.last_N,
            email: req.body.email,
            phone_N: req.body.phone_N,
        });

        await newDonation.save();
        console.log("Donation saved successfully!");
        res.status(200).send("Thank you for your donation!");
    } catch (err) {
        console.error("Error saving donation:", err.message); // Log the error message
        res.status(500).send("Error saving donation.");
    }
});




// Register models
const User = mongoose.model('User', userSchema);         // Correctly associate 'User' with userSchema
const Feedback = mongoose.model('Feedback', feedbackSchema);


app.post('/post', async (req, res) => {
    const { name, email, message } = req.body; // Adjust "feedback" to "message" if necessary
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        console.log(newFeedback);
        res.send('Feedback submitted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while submitting feedback.');
    }
});