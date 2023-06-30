let form = document.querySelector("#form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let obj = {
        name: form.name.value,
        image: form.image.value,
        specialization: form.filter.value,
        experience: form.exp.value,
        location: form.location.value,
        date: form.date.value,
        slots: form.slots.value,
        fee: form.fee.value,
    }
    postData(obj)
})


async function postData(obj) {
    try {
        let data = await fetch("https://mock4-wine.vercel.app/appointments", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        if (data.ok == false) {
            alert("form submitted")
            getData()
        }
    } catch (error) {
        console.log(error)
    }
}
getData()
async function getData() {
    try {
        let res = await fetch("https://mock4-wine.vercel.app/appointments")
        let data = await res.json()
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}


function displayData(data) {
    let parentDiv = document.querySelector("tbody")
    parentDiv.innerHTML = ""
    let array = data.map((item) => {
        return `<tr">
        <td>${item.name}</td>
        <td>${item.specialization}</td>
        <td>${item.experience}</td>
        <td>${item.location}</td>
        <td>${item.slots}</td>
        <td>Edit</td>
        <td class="dlt" data-id=${item.id}>Delete</td>
        <td>appointment</td>
        </tr>`
    })
    parentDiv.innerHTML = array.join(" ")
    let alldltbtn = document.querySelectorAll(".dlt")
    for (let dltBtn of alldltbtn) {
        dltBtn.addEventListener("click", (e) => {
            let id = e.target.dataset.id
            deleteData(id)
        })
    }
}

async function deleteData(id) {
    try {
        let data = await fetch(`https://mock4-wine.vercel.app/appointments/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        if (data.ok) {
            getData()
        }
    } catch (error) {
        console.log(error)
    }
}