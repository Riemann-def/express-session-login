document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                window.location.href = '/';
                
            } else {
                document.getElementById("error").innerText = data.message;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })

});