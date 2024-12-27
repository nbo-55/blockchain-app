// Importing necessary modules
const express = require('express');
const path = require('path');
const cryptoRoutes = require('./routes/cryptoRoutes');

// Initialize the Express app
const app = express();

// Set EJS as the view engine for rendering dynamic HTML
app.set('view engine', 'ejs');

// Serve static files (like CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the crypto-related routes
app.use('/crypto', cryptoRoutes);

// Root route: Render the home page
app.get('/', (req, res) => {
    res.render('index', { data: null }); // Render the index view without any data initially
});

// Catch-all route for handling 404 errors
app.use((req, res) => {
    res.status(404).render('error', { message: 'nyasar ya..., yang dirimu cari ngga ada disini...' });
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
