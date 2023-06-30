document.querySelector("#adminBtn").addEventListener("click",()=>{
 window.location.href="admin.html"
})

document.querySelector("#userBtn").addEventListener("click",()=>{
 window.location.href="index.html"
    
})


let form=document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let skills=[form.skills.value.split(",")]
   let obj={
    name:form.name.value,
    email:form.email.value,
    password:form.pass.value,
    profession:form.profession.value,
    skills:skills[0],
    hourly_rate:form.hourly.value,
    profile_picture:form.image.value,
    isBooked:form.check.checked
   }
   postData(obj)
})

async function postData(obj){
try {
    let data=await fetch("https://freelancer-rgl4.onrender.com/freelancers",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    if(data.ok){
        alert("Successfully registered")
    }
} catch (error) {
    console.log(error)
}
}