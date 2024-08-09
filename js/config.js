let waitresp = false;
(async () => {
    function logout() {
        localStorage.clear()
        location.reload()
    }
    //config wss

    function pulseWrong(w) {
        const username = document.getElementsByClassName("emailsign")[1]
        const password = document.getElementsByClassName("emailsign")[2]
        if (!w) {
            password.animate([{ borderColor: "red" }], { duration: 250, fill: "forwards" })
        }
        const anim = username.animate([{ borderColor: "red" }], { duration: 250, fill: "forwards" })
        anim.onfinish = () => {
            username.animate([{ borderColor: "white" }], { duration: 250, fill: "forwards" })
            password.animate([{ borderColor: "white" }], { duration: 250, fill: "forwards" })
        }


    }
    function getUserData() {
        return JSON.parse(localStorage.getItem("user"))
    }


    try {
        const tlresponse = await fetch('https://api.terminalsaturn.com:444/ping', {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await tlresponse.json()
        if (result) {
            localStorage.setItem("ts", true)
        }

    } catch (rer) {
        console.error(rer)
        localStorage.setItem('ts', false)
        setTimeout(() => {
            console.clear()
            console.warn("failed to connect to server")
        }, 100);

    }

    if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com/") {
        const ts = localStorage.getItem("ts")

        async function Login() {
            const username = document.getElementsByClassName("emailsign")[1]
            const password = document.getElementsByClassName("emailsign")[2]

            const response = await fetch('https://api.terminalsaturn.com:444/loginsite', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([username.value, password.value])
            })
            const rdata = await response.json()

            if (typeof rdata === "object") {
                localStorage.setItem("user", JSON.stringify(rdata))
                const emgrp = document.getElementsByClassName("emailsign");
                let iframe = document.getElementById("TOP");
                const userProfilePicture = rdata.profilepicture;

                iframe.contentWindow.postMessage([500, userProfilePicture], '*');

                if (getUserData()['admin']) {
                    iframe.contentWindow.postMessage([501], "*")
                }
                document.getElementsByClassName('spgpfp')[0].src = userProfilePicture
                logged = true
                for (const x of emgrp) {
                    const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
                    animation.onfinish = () => {
                        if (x.tagName != "LABEL") {
                            x.style.display = "none";
                        }
                    };

                }

                let ems = document.getElementById("emailsign_title")
                ems.style.fontSize = "25px"
                ems.textContent = `welcome, ${getUserData()['username']}.`
                ems.style.display = "block"
                document.getElementsByClassName("spguname")[0].textContent = getUserData()['username']
                ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
                window.postMessage("501_l", "*")
                return true

            }
            else if (rdata.includes("incorrect")) {
                pulseWrong()
                return
            }
        }
        //end of login

        document.getElementsByClassName('emailsign')[3].addEventListener("click", async () => {
            if (ts) {
                const checkwait = await Login()
            } else {
                console.log("not ts")
            }
        })
        document.getElementsByClassName("emailsign")[4].addEventListener("click", async () => {
            const username = document.getElementsByClassName("emailsign")[1]
            const password = document.getElementsByClassName("emailsign")[2]
            if (ts) {
                const Data = await fetch("https://api.terminalsaturn.com:444/signup", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify([username.value, password.value])
                })
                const result = await Data.json()
                if (result[1] === 300) {
                    pulseWrong(true)
                }
                else if(result[1] === 301){
                    await Login()
                } 
            }
        })

        let userdata = localStorage.getItem("user")

        if (userdata != "undefined" && userdata != null && localStorage.getItem("ts")) {
            const parsed = getUserData()
            console.log("get data")
            const response = await fetch('https://api.terminalsaturn.com:444/loginsite', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([parsed['username'], parsed['password']])
            })
            const rdata = await response.json()
            if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com/") {
                const emgrp = document.getElementsByClassName("emailsign");
                let iframe = document.getElementById("TOP");
                const userProfilePicture = getUserData().profilepicture;

                iframe.contentWindow.postMessage([500, userProfilePicture], '*');
                document.getElementsByClassName('spgpfp')[0].src = userProfilePicture
                logged = true
                for (const x of emgrp) {
                    const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
                    animation.onfinish = () => {
                        if (x.tagName != "LABEL") {

                            x.style.display = "none";
                        }
                    };

                }
                let ems = document.getElementById("emailsign_title")
                ems.style.fontSize = "25px"
                ems.textContent = `welcome, ${getUserData()['username']}.`
                ems.style.display = "block"
                ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
                console.log("k")

            }
        }

        //if topbar becomes global consider removing this from index check

    }

})() 

//index testing:
//1. log into site fresh with no saved data -- PASS
//2. Sign out and sign back in -- PASS
//3 refresh site. -- PASS
//4 all offline disconnects function with silenced 404 errors  -- PASS
//5 Information is updated with a fresh copy from server on refresh -- PASS
// STABLE AS OF 8/04/24

