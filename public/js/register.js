const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const { username, password, password_check } = ev.target.elements;

    fetch("http://localhost:8080/register", {
        method: "PATCH",
        body: JSON.stringify({
            [username.value.toLowerCase()]: password.value,
            password_check: password_check.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.text())
    .then(console.log)
    .catch(console.error);
});

