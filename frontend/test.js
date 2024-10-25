// Select the forms and messages
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('error-message');
const registerMessage = document.getElementById('register-message');

// Event listener for login form submission
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert(`Login successful! Welcome, ${username}`); // Print the username
        errorMessage.textContent = ''; // Clear the error message
    } else {
        errorMessage.textContent = data.message; // Show error message
    }
});

// Event listener for registration form submission
registerForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get the new username and password values
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Send registration request
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
        registerMessage.textContent = 'Registration successful! You can now log in.';
        registerForm.reset(); // Clear the form fields
    } else {
        registerMessage.textContent = data.message; // Show error message
    }
});
