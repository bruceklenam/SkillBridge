document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Account successfully created!");
    });
});