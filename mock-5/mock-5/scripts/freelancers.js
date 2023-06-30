let page = 1
let token = localStorage.getItem("token")
let bag = []
fetchData();
async function fetchData() {
    try {
        let data = await fetch(`https://mock4-wine.vercel.app/freelancers?_page=${page}&_limit=4`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        if (data.ok == true) {
            let res = await data.json();
            bag = res
            renderData(res)
        } else {
            alert("something went wrong")
        }
    } catch (error) {
        console.log(error)
    }
}


function renderData(data) {
    let container = document.querySelector("#container")
    container.innerHTML = ""
    data.map((item) => {
        let div2 = document.createElement("div")
        let div1 = document.createElement("div")
        let img = document.createElement("img")
        img.setAttribute("src", item.profile_picture)
        let name = document.createElement("h1")
        name.innerText = item.name
        let email = document.createElement("p")
        email.innerText = `Email: ${item.email}`
        let profession = document.createElement("p")
        profession.innerText = `Profession: ${item.profession}`
        let skills = document.createElement("p")
        skills.innerText = `Skills: ${item.skills}`
        let rate = document.createElement("p")
        rate.innerText = `Hourly Rate: $${item.hourly_rate}`
        let booking = document.createElement("p")
        booking.innerText = `Booking Status : ${item.isBooked}`
        let edtBtn = document.createElement("button")
        edtBtn.innerText = "Edit"
        edtBtn.setAttribute("class", "edit")
        let dltBtn = document.createElement("button")
        dltBtn.innerText = "Delete"
        dltBtn.setAttribute("class", "delete")
        dltBtn.setAttribute("data-id", item.id)

        let hireBtn = document.createElement("button")
        hireBtn.innerText = "HIRE ME"
        hireBtn.setAttribute("class", "hire")
        hireBtn.style.cursor = item.isBooked ? "pointer" : "no-drop"
        hireBtn.setAttribute("data-id", item.id)
        div1.append(img, name, email, profession, skills, rate, booking, edtBtn, dltBtn, hireBtn)
        div2.append(div1)
        container.append(div2)
    })
    let allhireBtn = document.querySelectorAll(".hire")
    for (let hirbtn of allhireBtn) {
        hirbtn.onclick = async (e) => {
            let id = e.target.dataset.id
            await chngehireData(id)
            hirbtn.disabled = true
            hirbtn.style.cursor = "no-drop"
        }
    }

    let allDltBtn = document.querySelectorAll(".delete")
    for (let dltbtn of allDltBtn) {
        dltbtn.addEventListener("click", (e) => {
            let id = e.target.dataset.id
            deleteData(id)
        })
    }
}

async function deleteData(id) {
    try {
        let data = await fetch(`https://mock4-wine.vercel.app/freelancers/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        if (data.ok) {
            renderData(data)
        }

    } catch (error) {
        console.log(error)
    }
}


async function chngehireData(id) {
    try {
        let data = await fetch(`https://mock4-wine.vercel.app/freelancers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ isBooked: false })
        })
        if (data.ok) {
            renderData(data)
        }

    } catch (error) {
        console.log(error)
    }
}

document.querySelector("#sort").addEventListener("change", (e) => {
    let val = e.target.value
    let sortData
    if (val == "") {
        renderData(bag)
    }
    if (val == "asc") {
        sortData = bag.sort((a, b) => a.hourly_rate - b.hourly_rate)
    } else if (val == "desc") {
        sortData = bag.sort((a, b) => b.hourly_rate - a.hourly_rate)
    }
    renderData(sortData)
})

document.querySelector("#filter").addEventListener("change", (e) => {
    let val = e.target.value
    if (val == "") {
        renderData(bag)
    } else {
        let filterData = bag.filter((el) => {
            return el.profession == val
        })
        renderData(filterData)
    }
})


let searchBtn = document.querySelector("#searchbtn")
searchBtn.addEventListener("click", function () {
    let val = document.querySelector("#search").value
    searchData(val)
})

function searchData(val) {
    if (val == "") {
        renderData(bag)
    } else {
        let searchData = bag.filter((el) => {
            return el.name.toLowerCase().includes(val.toLowerCase())
        })
        renderData(searchData)
    }
}