const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Database connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});