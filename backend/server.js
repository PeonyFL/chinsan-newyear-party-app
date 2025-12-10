const express = require('express');
const cors = require('cors');
const { initDb } = require('./src/config/db');

const employeeRoutes = require('./src/routes/employeeRoutes');
const voteRoutes = require('./src/routes/voteRoutes');
const prizeRoutes = require('./src/routes/prizeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize DB (kept on startup)
initDb();

// Routes
app.use('/', employeeRoutes);
app.use('/', voteRoutes);
app.use('/', prizeRoutes);

app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));