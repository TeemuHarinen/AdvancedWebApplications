const logError = document.getElementById("logError");

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if(response.status === 401 || response.status === 403) {
            logError.textContent = "Invalid credentials"
        }
        return response.json();
    
    })
    .then(data => {
        if (data.token) {
            // Save the token to localStorage
            storeToken(data.token);
            window.location.href = "/";
        } else {
            console.error("Login failed");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
    });
});

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}