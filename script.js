// Hugo

// Prices for each course offered
const coursePrices = {
    "Course 1": 40,
    "Course 2": 60,
    "Course 3": 90,
    "Course 4": 120,
    "Course 5": 150
};

// Object to maintain the number of courses in the shopping cart
let cart = {
    "Course 1": 0,
    "Course 2": 0,
    "Course 3": 0,
    "Course 4": 0,
    "Course 5": 0
};

// Main block that runs once the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Redirects user to login page if not logged in when accessing 'course.html'
    if (window.location.pathname.includes('course.html')) {
        checkLoginStatus();
    }

    // Function to check if the user is logged in
    function checkLoginStatus() {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            console.log("User is not logged in. Redirecting to login page...");
            window.location.href = 'login.html'; 
        } else {
            console.log("User is logged in. Access granted.");
        }
    }
    
    // Logout process
    document.getElementById('logoutButton')?.addEventListener('click', function() {
        alert('You have logged out.');
        localStorage.removeItem('isLoggedIn'); 
        window.location.href = 'index.html'; 
    });
    
    // Login form submission handling
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
    
        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true'); 
            window.location.href = 'course.html';
        } else { 
            alert('Incorrect email or password.');
        }
    });
    
    // Registration form submission handling
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
    
        if (password === confirmPassword) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        } else {
            alert('Passwords do not match.');
        }
    });

    // Event listeners for adding/removing courses from cart
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        const addButton = course.querySelector('button');
        const courseName = course.querySelector('h2').textContent;

        addButton.addEventListener('click', () => {
            const quantityInput = course.querySelector('input[type="text"]');
            const quantity = parseInt(quantityInput.value.trim());
            cart[courseName] += quantity; 
            updateTotalPrice(); 
        });

        const removeButton = course.querySelector('.remove-course');
        removeButton.addEventListener('click', () => {
            cart[courseName] = 0; 
            const quantityInput = course.querySelector('input[type="text"]');
            quantityInput.value = '';
            updateTotalPrice(); 
        });
    });

    // Button to clear the shopping cart
    const clearCartButton = document.querySelector('.clear-cart');
    clearCartButton.addEventListener('click', () => {
        Object.keys(cart).forEach(course => cart[course] = 0); 
        document.querySelectorAll('.course input[type="text"]').forEach(input => input.value = '');
        updateTotalPrice(); 
    });

    // Checkout button functionality
    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        let totalPrice = 0;
        Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
        alert(`You should pay Hugo for $${totalPrice}`); 
    });
});

// Function to update total price of courses in the cart
function updateTotalPrice() {
    let totalPrice = 0;
    let detailsHtml = '';
    Object.keys(cart).forEach(course => {
        totalPrice += cart[course] * coursePrices[course];
        if (cart[course] > 0) {
            detailsHtml += `<p>${course}: Quantity ${cart[course]}, Price $${(cart[course] * coursePrices[course]).toFixed(2)}</p>`;
        }
    });
    const totalPriceElement = document.querySelector('.total-price-section h2');
    totalPriceElement.textContent = `Total Price for All Courses: $${totalPrice}`;
    document.getElementById('course-details').innerHTML = detailsHtml;
}

// Enquiry form submission handling
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value.trim();

    if (!name || !email || !phone || !date) {
        alert('All fields must be filled out');
        return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }

    alert('Submission successful, pending review.'); 
    this.submit(); 
});
