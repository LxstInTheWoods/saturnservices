const uploadbutton = document.getElementById('opnrptc')
const adminframe = document.getElementById("admnewsupload")
const closebutton = document.getElementById("closeadm")

uploadbutton.addEventListener("click", ()=>{
   adminframe.style.opacity = 1
   adminframe.style.display = "initial"
})
closebutton.addEventListener("click", ()=>{
    adminframe.style.opacity = 0
    adminframe.style.display = "none"
})