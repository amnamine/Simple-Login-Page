// Select the forms and error/success message elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('error-message');
const registerMessage = document.getElementById('register-message');

// Handle login form submission
if (loginForm) {
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
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Show success message
            errorMessage.textContent = ''; // Clear the error message
            // Optionally, redirect to another page or update the UI
        } else {
            errorMessage.textContent = data.message; // Show error message
        }
    });
}

// Handle registration form submission
if (registerForm) {
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Get the username and password values
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        // Send registration request
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            registerMessage.textContent = 'Registration successful!'; // Show success message
            registerForm.reset(); // Clear the form
        } else {
            registerMessage.textContent = data.message; // Show error message
        }
    });
}
