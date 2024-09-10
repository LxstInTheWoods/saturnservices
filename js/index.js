import * as utils from "./modules.js"
import { SID , awaitSID} from "./wshandler.js"

(async () => {
    await awaitSID()
    if (!utils.ping()){utils.generateNotification("System", "Server Offline") ;return}
    const thing = document.getElementById("SSINTRO")

    const divid_top = document.getElementsByClassName("divid_top")

    const typewrite = document.getElementById("csttpwrt2")

    let iframe = document.getElementById("TOP");

    let logged = false

    const aqhead = document.getElementById("aqhead")

    let emgrp = document.getElementsByClassName("emailsign")

    //sign in, get info from server if already signed in
    function rmsgnp() {
        function rest() {
            const parsed = utils.getUserData()

            logged = true
        }
        for (const x of emgrp) {
            const animation = x.animate([{ opacity: 0}], { duration: 250, fill: "forwards" });
            if (x.id != "emailsign_title"){
            animation.onfinish = () => {
                    x.style.display = "none";
            };
        }

        }
        rest()

    }

    let data = localStorage.getItem("user")
    if (data != "undefined" && data != null) {
        (async () => {
            const prs = JSON.parse(data)


                const response = await fetch('https://terminalsaturn.com/loginsite', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([prs['username'], prs['password'], SID])
                })
                const result = await response.json()
                if (typeof result === "object") {
                    console.log(result)
                    //result['data'] = JSON.parse(result['data'])
                    localStorage.setItem('user', JSON.stringify(result))
                }
            rmsgnp()
        })();
    }
    else {

        logged = false

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
        const str = "Where possibility becomes reality."
        var cur = ""
        async function r(){
            for (const x of str) {
                let p = new Promise((r) => {
                    setTimeout(() => {
                        cur += x
                        typewrite.textContent = cur
                        r()
                    }, 7);
                })
    
                await p
            }
        } r()
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
        x.parentElement.animate([{ border: "solid rgb(71, 71, 71) 2px" }], { duration: 250, fill: 'forwards' })
    })
    x.addEventListener("mouseleave", () => {
        x.animate([{ border: "solid rgb(71, 71, 71) 2px" }], { duration: 250, fill: 'forwards' })

    })

}
const dnld = document.getElementsByClassName("order")[0]
dnld.addEventListener("mouseenter", () => {
    dnld.animate([{ boxShadow: "0 0 10px white, 0 0 30px white, 0 0 50px white" }], { duration: 150, fill: "forwards" })
})
dnld.addEventListener("mouseleave", () => {
    dnld.animate([{ boxShadow: "0 0 10px #115dd6, 0 0 30px #115dd6, 0 0 50px #115dd6" }], { duration: 150, fill: "forwards" })
})

}) ()

function handleImageError(image) {
    image.onerror = null;
    image.src = './img/guesticon.png';
    console.warn("Fallback image set due to an error loading the primary image.");
}

//move animation stuff later
(async () => {
    const text = "Welcome to TerminalSaturn. We are a front and backend development team focused on delivering minimal yet vibrant creations to the world.".split(/(?=[a-zA-Z0-9])/)
    let newstring = ""
    let addedBr = false
    for (const [i, v] of Object.entries(text)) {
        if (i > Math.round(text.length / 3) && v.match(/\s+/) && !addedBr) {
            addedBr = true
            newstring += `${v} <br>`
        }
        else {
            newstring += `${v}`
        }
    }
    document.getElementById("tsdesc").innerHTML = newstring
})()