let form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let obj = {
        email: form.email.value,
        password: form.pass.value
    }
    LoginFunction(obj)
})

async function LoginFunction(obj) {
    try {
        let login_request = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        if (login_request.ok) {
            let data = await login_request.json()
            let userToken = data.token
            localStorage.setItem("token", userToken)
            window.location.href = "freelancers.html"
        } else {
            document.querySelector("#loader").innerHTML = "Loading..."
        }
    } catch (error) {
        console.log(error)
    }
}