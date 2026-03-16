document.getElementById("leadForm").addEventListener("submit", async function (e) {

    e.preventDefault()

    const data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        dateOfBirth: document.getElementById("dob").value
    }

    const res = await fetch("/submit-lead", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    document.getElementById("result").innerText = result.message
})