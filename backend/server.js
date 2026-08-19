const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Serve frontend files
app.use(express.static('../frontend'));

app.get('/api/movie', async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    // Debug log to confirm API key is loaded
    console.log("Loaded API Key:", process.env.API_KEY);

    // Use native fetch (Node v18+ supports it)
    const response = await fetch(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${process.env.API_KEY}`
    );
    const data = await response.json();

    console.log("OMDb response:", data);

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
