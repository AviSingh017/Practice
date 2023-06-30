
let loginBtn=document.querySelector("#loginbtn")
loginBtn.addEventListener("click",()=>{
    let signupBtn=document.querySelector("#Signupbtn")
   let signupForm= document.querySelector("#signup")
   signupForm.style.display="none"
   let loginForm= document.querySelector("#login")
    loginForm.style.display="block"
   loginBtn.style.backgroundColor="black"
   loginBtn.style.padding="5px"
   loginBtn.style.color="white"
   loginBtn.style.border="none"
   signupBtn.style="none"

})

let signupBtn=document.querySelector("#Signupbtn")
signupBtn.addEventListener("click",()=>{
    let loginForm= document.querySelector("#login")
    loginForm.style.display="none"
    let signupForm= document.querySelector("#signup")
    signupForm.style.display="block"
    signupBtn.style.backgroundColor="black"
    signupBtn.style.padding="5px"
    signupBtn.style.color="white"
    signupBtn.style.border="none"
    loginBtn.style="none"
 })





let signupForm= document.querySelector("#signup")
signupForm.addEventListener("submit",function(e){
    e.preventDefault()
    let obj={
        name:signupForm.name.value,
        email:signupForm.email.value,
        password:signupForm.password.value,
        isDoctor:signupForm.check.checked
    }
    postData(obj)
})

async function postData(obj){
   try {
    let data=await fetch("https://hospital-server-cqkz.onrender.com/users",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    console.log(data);
    if(data.ok==false){
        alert("Signup Successfully")
    }
   } catch (error) {
    console.log(error)
   }
}


let loginForm= document.querySelector("#login")
loginForm.addEventListener("submit",async(e)=>{
    e.preventDefault()
    let email=loginForm.mail.value
    let password=loginForm.pass.value
    let fetchData= await getData()
    let result=fetchData.filter((el)=>{
        return el.email==email && el.password==password
    })
    if(result.length){
      alert("login successful")
      if(result[0].isDoctor){
        window.location.href="doctor.html"
      }else{
        window.location.href="Appointment.html"
      }
    }else{
        alert("login failed")
    }
})

async function getData(){
    try {
        let res=await fetch("https://hospital-server-cqkz.onrender.com/users")
        let data=await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}