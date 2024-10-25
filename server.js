const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const db = require('./database'); // Import the database connection
const app = express();

// Allow requests from the specific front-end origin
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true // Allow cookies and session handling
}));

app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

// User registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// User login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        req.session.user = user;
        return res.status(200).json({ message: 'Login successful!' });
    });
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully.' });
});

// Protected route example
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: 'Welcome to the dashboard!' });
    } else {
        res.status(401).json({ message: 'Unauthorized access.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Route to fetch all registered users (for demonstration purposes only)
app.get('/users', (req, res) => {
    db.all(`SELECT username, password FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving users.' });
        }
        res.status(200).json(rows); // Send the users data back to the client
    });
});
