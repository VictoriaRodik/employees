const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS test');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const employeeRoutes = require('./src/routes/employeeRoutes');
app.use('/employees', employeeRoutes);
