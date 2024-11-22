const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passwordRoutes = require('./routes/PasswordRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(express.json());

app.use('/api', passwordRoutes);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
