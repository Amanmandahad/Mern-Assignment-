const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let latestUser = null; 

// POST /api/user
// POST /api/user
app.post('/api/user', (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;
    if (!firstName || !lastName || !dob) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    latestUser = { firstName, lastName, dob };
    res.status(201).json(latestUser);
  } catch (err) {
    console.error('Error in POST /api/user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/user
app.get('/api/user', (req, res) => {
  try {
    if (!latestUser) {
      return res.status(404).json({ message: 'No user saved yet' });
    }
    res.json(latestUser);
  } catch (err) {
    console.error('Error in GET /api/user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });


