// Importing necessary modules
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Axios is used for making HTTP requests

// Base URL for the Blockchain API v3
const API_BASE_URL = 'https://api.blockchain.com/v3/exchange';

// Route to fetch cryptocurrency prices (tickers)
router.get('/tickers', async (req, res) => {
    try {
        // Send a GET request to the tickers endpoint
        const response = await axios.get(`${API_BASE_URL}/tickers`);
        // Render the index view and pass the API response data
        res.render('index', { data: response.data });
    } catch (error) {
        // Log the error to the console and render an error page
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching cryptocurrency data!' });
    }
});

// Mengakses endpoint '/symbols' untuk mengambil data simbol trading
router.get('/symbols', async (req, res) => {
    try {
        // Mengirimkan request ke API Blockchain untuk mengambil data simbol
        const response = await axios.get(`${API_BASE_URL}/symbols`);

        // Menampilkan respons data di console untuk debugging
        console.log('API Response:', response.data);  // Periksa struktur data yang diterima

        // Pastikan bahwa data yang diterima adalah array
        // Jika tidak, kirim array kosong
        const symbols = Array.isArray(response.data) ? response.data : [];
        
        // Debugging: Log data setelah diproses
        console.log('Processed Symbols:', symbols);

        // Mengirimkan data ke template EJS untuk ditampilkan
        res.render('symbols', { data: symbols });
    } catch (error) {
        // Jika terjadi error saat mengambil data, tampilkan pesan error
        console.error('Error fetching symbols:', error.message);
        
        // Mengirimkan halaman error jika terjadi kesalahan
        res.status(500).render('error', { message: 'Error fetching trading symbols!' });
    }
});

// Export the router to be used in the main app
module.exports = router;
