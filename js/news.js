const uploadbutton = document.getElementById('opnrptc')
const adminframe = document.getElementById("admnewsupload")
const closebutton = document.getElementById("closeadm")

//post request to get news reports from server

uploadbutton.addEventListener("click", () => {
    const animation = adminframe.animate([{ "opacity": 1 }], { duration: 250, fill: "forwards" })
    animation.onfinish = () => {
        adminframe.style.display = "initial"
    }

})
closebutton.addEventListener("click", () => {
    const animation = adminframe.animate([{ "opacity": 0 }], { duration: 250, fill: "forwards" })
    animation.onfinish = () => {
        adminframe.style.display = "none"
    }
})

document.getElementById("a_three").addEventListener("click", ()=>{
    const Title = document.getElementById("a_one").value
    const Description = document.getElementById("a_two").value

    const clone = document.getElementById("nrstrg").getElementsByClassName("newsreport")[0].cloneNode(true)
    const _parent = document.getElementById("s03")

    //post request to save to server.

    clone.children[0].textContent = Title
    clone.children[1].textContent = "ns"
    clone.children[2].textContent = Description

    _parent.appendChild(clone)
})