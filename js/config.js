
(async () => {
    try {
        const tlresponse = await fetch('https://api.terminalsaturn.com/ping', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([500])
        })
        const result = await tlresponse.json()
        if (result) {
            localStorage.setItem("ts", true)
        }

    } catch (rer) {
        console.error(rer)
        localStorage.setItem('ts', false)
        setTimeout(() => {
           // console.clear()
            console.warn("failed to connect to server")
        }, 0);

    }

    if (window.location.href.includes("index") || window.location.href.includes("https://terminalsaturn.com")) {

        let userdata = localStorage.getItem("user")

        if (userdata != "undefined" && userdata != null && localStorage.getItem("ts")) {
            const parsed = JSON.parse(userdata)
            const response = await fetch('https://api.terminalsaturn.com/loginsite', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([parsed['username'], parsed['password']])
            })
            console.log(parsed)
            const rdata = await response.json()
            console.log(rdata)
            if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com/") {
                const emgrp = document.getElementsByClassName("emailsign");
                let iframe = document.getElementById("TOP");
                for (const x of emgrp) {
                    const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
                    animation.onfinish = () => {
                        x.style.display = "none";
                        ems.style.fontSize = "25px"
                        ems.textContent = `welcome, ${JSON.parse(localStorage.getItem("user"))['username']}.`
                        ems.style.display = "block"
                        const userProfilePicture = JSON.parse(localStorage.getItem("user")).profilepicture;
                        iframe.contentWindow.postMessage([500, userProfilePicture], '*');
                        logged = true



                    };

                }
                console.log('x2')
                let ems = document.getElementById("emailsign_title")
                ems.style.fontSize = "25px"
                ems.textContent = `welcome, ${JSON.parse(localStorage.getItem("user"))['username']}.`
                ems.style.display = "block"
                ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
                
            }
        }

    }
})()