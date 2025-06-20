const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const aiRoute = require('./routes/ai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://subhadeepmalik2710:SubhaAnkit%402004@cluster0.mspbuiv.mongodb.net/Interviewy?retryWrites=true&w=majority').then(()=>console.log('MongoDB connected'))

app.use('/upload', uploadRoute);
app.use('/ai', aiRoute);

app.listen(process.env.PORT, () => console.log('Server running on port 5000'));
