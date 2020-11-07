const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target.elements;

    fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
            [username.value.toLowerCase()]: password.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.text())
    .then(console.log)
    .catch(console.error);
});