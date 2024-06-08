const thing = document.getElementById("SSINTRO")

const divid_top = document.getElementsByClassName("divid_top")

const typewrite = document.getElementById("csttpwrt2")

let iframe = document.getElementById("TOP");

let logged = false

const aqhead = document.getElementById("aqhead")

let emgrp = document.getElementsByClassName("emailsign")

let waitresp = false

const settingspage = document.getElementById("settingspage");
const computedStyle = window.getComputedStyle(settingspage);

function initsignout(){
    document.getElementsByClassName('spglogout')[0].addEventListener("click", ()=>{
        localStorage.clear()
        window.location.reload()
    })
}
//sign in, get info from server if already signed in
function rmsgnp() {
    for (const x of emgrp) {
        const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
        animation.onfinish = () => { 
            const parsed = JSON.parse(localStorage.getItem("user"))
            x.style.display = "none";
            let ems = document.getElementById("emailsign_title")
            ems.textContent = `welcome, ${parsed.username}.`
            ems.style.display = "block"
            ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
            const userProfilePicture = parsed.profilepicture
            settingspage.getElementsByClassName("spgpfp")[0].src = userProfilePicture
            settingspage.getElementsByClassName("spguname")[0].textContent = parsed.username
            console.log("not so wtf")
            iframe.contentWindow.postMessage([500, userProfilePicture], '*');
            logged = true

            initsignout()


        };

    }
    
}
let data = localStorage.getItem("user")
if (data != "undefined" && data != null) {
    rmsgnp()
}   
else {

    logged = false

    emgrp[3].addEventListener("click", async () => {
        if (waitresp) {return}
        const response = await fetch('https://api.terminalsaturn.com/loginsite', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([emgrp[1].value, emgrp[2].value])
        })

        const result = await response.json()
        if (typeof result === "object") {
            if (result['username'] === emgrp[1].value) {
                localStorage.setItem('user', JSON.stringify(result))
                console.log(JSON.parse(localStorage.getItem("user")))

                rmsgnp()

            }
            waitresp = false
        } else{waitresp = false}

    })
}



thing.animate([{ opacity: 1 }], { duration: 500, fill: 'forwards' })

setTimeout(() => {
    for (const x of divid_top) {
        x.animate([{ width: "100%" }], { duration: 450, fill: "forwards" })
    }
    aqhead.animate([{ opacity: 1 }], { duration: 250, fill: "forwards" }).finished.then(() => {
        for (const x of document.getElementsByClassName("abtus")) {
            x.animate([{ backgroundColor: "#1a1a1a" }], { duration: 250, fill: "forwards" })
        }
    })
    document.body.animate([{ backgroundColor: "#1a1a1a" }], { duration: 250, fill: "forwards" })
    const str = "Envisioning a Future of Possibilities."
    var cur = ""
    _ = async () => {
        for (const x of str) {


            let p = new Promise((r) => {
                setTimeout(() => {
                    cur += x
                    typewrite.textContent = cur
                    r()
                }, 7);
            })

            await p.then(() => { })
        }
    }; _()



}, 500);



for (const [x, v] of Object.entries(document.getElementById("aboutholder").children)) {
    v.addEventListener("mouseenter", function () {
        v.animate([{ backgroundColor: "#343434", borderColor: "white" }], { duration: 250, fill: "forwards" })
    })
    v.addEventListener("mouseleave", function () {
        v.animate([{ backgroundColor: "rgb(24,24,24)", borderColor: "rgb(24,24,24)" }], { duration: 250, fill: "forwards" })

    })
}

for (const x of [...document.getElementsByClassName("prefregion")]) {
    x.addEventListener("mouseenter", () => {
        x.animate([{ border: "solid white 2px" }], { duration: 250, fill: 'forwards' })
    })

    x.parentElement.addEventListener("mouseenter", () => {

        x.parentElement.animate([{ border: "solid white 2px" }], { duration: 250, fill: 'forwards' })
    })

    x.parentElement.addEventListener("mouseleave", () => {
        x.parentElement.animate([{ border: "solid #2c2c2c 2px" }], { duration: 250, fill: 'forwards' })
    })
    x.addEventListener("mouseleave", () => {
        x.animate([{ border: "solid #2c2c2c 2px" }], { duration: 250, fill: 'forwards' })

    })

}
const dnld = document.getElementsByClassName("order")[0]
dnld.addEventListener("mouseenter", () => {
    dnld.animate([{ boxShadow: "0 0 10px white, 0 0 30px white, 0 0 50px white" }], { duration: 150, fill: "forwards" })
})
dnld.addEventListener("mouseleave", () => {
    dnld.animate([{ boxShadow: "0 0 10px #115dd6, 0 0 30px #115dd6, 0 0 50px #115dd6" }], { duration: 150, fill: "forwards" })
})



window.addEventListener("message", function(event){
    if (computedStyle.opacity === "0"){
        settingspage.style.display = "block"
        settingspage.animate([{'opacity':1}], {duration:250, fill:"forwards"})
    }
})

document.getElementById("spgclose").addEventListener('click', function(){
    if (computedStyle.opacity === "1"){
        const anim = settingspage.animate([{'opacity':0}], {duration:250, fill:"forwards"})
        anim.onfinish = () =>{
            settingspage.style.display = "none"
        }
    }
})