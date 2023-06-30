let page = localStorage.getItem("page") || 1;
let bag = [];

async function getData(page) {
    try {
        let res = await fetch(`https://hospital-server-cqkz.onrender.com/appointments?_limit=${4}&_page=${page}`);
        let data = await res.json();
        bag = data;
        displayData(data);
    } catch (error) {
        console.log(error);
    }
}

getData(page);

function displayData(data) {
    let parentDiv = document.querySelector("#data-list-wrapper");
    parentDiv.innerHTML = "";
    let array = data.map((item) => {
        return `<div class="item-list">
        <img src=${item.image} width="100%"/>
        <h1>${item.name}</h1>
        <p>Specialization : ${item.specialization}</p>
        <p>Experience : ${item.experience}</p>
        <p>Location : ${item.location}</p>
        <p>Date : ${item.date}</p>
        <p>Slots : ${item.slots}</p>
        <p>Fee : $${item.fee}</p>
        <button class="bookBtn" data-id=${item.id}>Book Now</button>
        </div>`;
    });

    parentDiv.innerHTML = array.join(" ");
    let bookBtn = document.querySelectorAll(".bookBtn");

    for (let btn of bookBtn) {
        btn.addEventListener("click", async (event) => {
            let button = event.target;
            button.disabled = true; // Disable the button after clicking

            let id = button.dataset.id;
            let item = data.find((el) => el.id == id);

            if (item.slots > 0) {
                item.slots--;
                try {
                    await patchData(id, { slots: item.slots });
                    alert(`Booking successful for Doctor ${item.name}`);
                } catch (error) {
                    alert(`Error occurred while booking for ${item.name}: ${error}`);
                }
            } else {
                alert(`No available slots for ${item.name}`);
            }
        });
    }
}

async function patchData(id, newData) {
    try {
        let res = await fetch(`https://hospital-server-cqkz.onrender.com/appointments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        });
        if (res.ok) {
            getData(page);
        }
    } catch (error) {
        console.log(error);
    }
}


let filter = document.querySelector("#filter")
filter.addEventListener("change", function (e) {
    let val = e.target.value
    if (val == "") {
        displayData(bag)
    } else {
        filterData(val)
    }
})

async function filterData(val) {
    try {
        let res = await fetch(`https://hospital-server-cqkz.onrender.com/appointments?_limit=${4}&_page=${page}&specialization=${val}`)
        let data = await res.json()
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}

// let sorting = document.querySelector("#sorting")
// sorting.addEventListener("change", function (e) {
//     let value = e.target.value
//     let SortData;
//     if (value == "") {
//         displayData(bag)
//     } else if (value === "asc") {
//         SortData = bag.sort((a, b) => a.date - b.date)
//         displayData(SortData)
//     } else if (value === "desc") {
//         SortData = bag.sort((a, b) => b.date - a.date)
//         displayData(SortData)
//     }
// })

let sorting = document.querySelector("#sorting");
sorting.addEventListener("change", function (e) {
  let value = e.target.value;
  let sortedData;

  if (value === "") {
    sortedData = bag; // Use the original data
  } else if (value === "asc") {
    sortedData = [...bag].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (value === "desc") {
    sortedData = [...bag].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  displayData(sortedData);
});



let searchBtn = document.querySelector("#searchbtn")
searchBtn.addEventListener("click", function (e) {
    let val = document.querySelector("#search").value
    searchData(val)
})

async function searchData(val) {
    try {
        let res = await fetch(`https://hospital-server-cqkz.onrender.com/appointments?_limit=${4}&_page=${page}&name=${val}`)
        let data = await res.json()
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}


document.querySelector("#next").addEventListener("click", () => {
    page++
    localStorage.setItem("page", page)
    getData(page)
})


document.querySelector("#prev").addEventListener("click", () => {
    page--
    if (page <= 0) {
        page = 1
        getData(page)
    }
    localStorage.setItem("page", page)
    getData(page)
})