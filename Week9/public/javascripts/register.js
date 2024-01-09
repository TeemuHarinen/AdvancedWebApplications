const regError = document.getElementById("regError");

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //regError.textContent = 'Password is not strong enough'

    fetch("/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/login.html";
        } else if(response.status === 403){
            document.getElementById("regError").textContent = 'Email already in use'
            console.error("Registration failed");
        } else if(response.status === 400){
            regError.textContent = 'Password is not strong enough'
        }
    })
    .catch(error => {
        console.error("Error during registration:", error);
    });
});