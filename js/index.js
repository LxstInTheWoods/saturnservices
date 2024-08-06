(async () => {
    //ts checks if server has connected
    if (!localStorage.getItem("ts")){

        function delay(ms) {
            return new Promise (resolve => setTimeout(resolve, ms))
        }
    
        (async ()=>{
            while (!localStorage.getItem("ts")) {
                try {
                    const data = await fetch("https://api.terminalsaturn.com:444/ping", {
                        mode:"cors",
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify([500])
                    })
                    const result = await data.json()
                    if (result) {
                        localStorage.setItem("ts", true)
                    }
                }catch(err){
                    warn("server unreachable")
                }
                await delay(1000)
            }
        })()
        
    }


    let ts = localStorage.getItem("ts")
    
    function getUserData(){
        return JSON.parse(localStorage.getItem("user"))
    }

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
            const parsed = getUserData()

            logged = true
        }
        for (const x of emgrp) {
            const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
            animation.onfinish = () => {
                if (x.id != "emailsign_title")
                    x.style.display = "none";
            };

        }
        rest()

    }

    let data = localStorage.getItem("user")
    if (data != "undefined" && data != null) {
        (async () => {
            const prs = JSON.parse(data)
            if (localStorage.getItem("ts")) {

                const response = await fetch('https://api.terminalsaturn.com:444/loginsite', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([prs['username'], prs['password']])
                })
                const result = await response.json()
                if (typeof (result) != "string") {
                    localStorage.setItem('user', JSON.stringify(result))
                }
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


    if (ts) {
        document.getElementsByClassName("teamcard")[0].getElementsByTagName("img")[0].src = 'https://cdn.discordapp.com/avatars/508684611396829196/351f7919a7ceb76e15f60bf03a9ce7d5?size=1024h'
        document.getElementsByClassName("teamcard")[1].getElementsByTagName("img")[0].src = 'https://cdn.discordapp.com/avatars/748436799759843371/5255649ea51ceb641d7652cf67e08213?size=1024'
        document.getElementsByClassName("teamcard")[2].getElementsByTagName("img")[0].src = 'https://cdn.discordapp.com/avatars/665407534386905101/4e1fcd29abde4ed370b0a67eca6977de?size=1024'

    }
})()

function handleImageError(image) {
    image.onerror = null;
    image.src = './img/guesticon.png';
    console.warn("Fallback image set due to an error loading the primary image.");
}

//move animation stuff later
(async () =>{
const text = "Welcome to TerminalSaturn. We are a front and backend development team focused on delivering minimal yet vibrant creations to the world.".split(/(?=[a-zA-Z0-9])/)
let newstring = ""
let addedBr = false
for (const [i, v] of Object.entries(text)) {
    if (i > Math.round(text.length / 3) && v.match(/\s+/) && !addedBr) {
        addedBr = true
    newstring += `${v} <br>`
    }
    else
    {
        newstring += `${v}`
    }
}
document.getElementById("tsdesc").innerHTML = newstring
})()