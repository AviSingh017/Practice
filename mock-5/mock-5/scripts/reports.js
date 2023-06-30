let token=localStorage.getItem("token")
let bag=[]
let totalfreelacer=0
let totalhours
let avghourlyrate=0
let totalBookSlot=0
let availableSlot=0
let count=0
let count1=0
fetchData();
async function fetchData() {
  try {
    let data = await fetch(`https://mock4-wine.vercel.app/freelancers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization:`Bearer ${token}`
      },
    });
    if (data.ok == true) {
      let res = await data.json();
      totalfreelacer=res.length
      bag=res
      totalhours=bag.reduce((acc,el)=>{
        acc=acc+(+el.hourly_rate)
        return acc
    },0)
    for(let i=0; i<res.length; i++){
        console.log("first")
        if(res[i].isBooked==true){
            count++
            console.log(count)
            availableSlot+=count
        }else{
            count1++
            totalBookSlot+=count1
        }
    }
     avghourlyrate=+(totalhours)/totalfreelacer
      renderData(res)
    }else{
        alert("something went wrong")
    }
  } catch (error) {
    console.log(error)
  }
}




function renderData(data){
  let tbody=document.querySelector("tbody")
  
  data.map((el)=>{
     let row=document.createElement("tr")
     let td1=document.createElement("td")
     td1.innerText=totalfreelacer
     let td2=document.createElement("td")
     td2.innerText=3
     let td3=document.createElement("td")
     td3.innerText=avghourlyrate
     let td4=document.createElement("td")
     td4.innerText=totalBookSlot
       let td5=document.createElement("td")
     td5.innerText=availableSlot
     row.append(td1,td2,td3,td4,td5)
     tbody.append(row)
  }) 


}