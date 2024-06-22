let waitresp = false;
(async () => {
    function logout(){
        localStorage.clear()
    }

    function _stp() {
        console.log("s")
        const parsed = JSON.parse(localStorage.getItem("user"))
        for (const [i, v] of Object.entries(parsed)) {
            const prnt = document.getElementsByClassName("datahold")[0]
            if (i != "data" && typeof v != "object") {
                const spgpropertyclone = document.getElementById("spgdataholdstrg").children[0].cloneNode(true)
                prnt.appendChild(spgpropertyclone)
                spgpropertyclone.children[0].textContent = i
                spgpropertyclone.children[1].value = v
                const oval = spgpropertyclone.children[1].value
                const apply = spgpropertyclone.children[2]
                spgpropertyclone.children[1].addEventListener("input", () => {
                    if (oval != spgpropertyclone.children[1].value) {
                        apply.animate([{ 'opacity': 1 }], { duration: 250, fill: "forwards" })
                    }
                    else {
                        apply.style.color = "black"
                        apply.animate([{ 'opacity': 0 }], { duration: 250, fill: "forwards" })


                    }
                })
                apply.addEventListener("click", () => {
                    apply.animate([{ 'opacity': 0 }], { duration: 250, fill: "forwards" })

                    fetch(`https://api.terminalsaturn.com/readwrite`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "type": "upd",
                            "userdata": [i, spgpropertyclone.children[1].value, localStorage.getItem("user")]
                        })
                    })
                })
            }
        }
    }

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
             console.clear()
            console.warn("failed to connect to server")
        }, 100);

    }

    if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com") {
        const ts = localStorage.getItem("ts")
        async function Login() {
            const username = document.getElementsByClassName("emailsign")[1].value
            const password = document.getElementsByClassName("emailsign")[2].value
            const response = await fetch('https://api.terminalsaturn.com/loginsite', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([username, password])
            })
            const rdata = await response.json()

            if (typeof rdata === "object") {
                localStorage.setItem("user", JSON.stringify(rdata))
                const emgrp = document.getElementsByClassName("emailsign");
                let iframe = document.getElementById("TOP");
                const userProfilePicture = rdata.profilepicture;

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
                ems.textContent = `welcome, ${JSON.parse(localStorage.getItem("user"))['username']}.`
                ems.style.display = "block"
                document.getElementsByClassName("spguname")[0].textContent = JSON.parse(localStorage.getItem("user"))['username']
                ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
                _stp();
                return true

            }
        }
        //end of login

        document.getElementsByClassName('emailsign')[3].addEventListener("click", async () => {
            if (ts) {
                const checkwait = await Login()
                console.log("run")
            }
        })

        let userdata = localStorage.getItem("user")

        if (userdata != "undefined" && userdata != null && localStorage.getItem("ts")) {
            //code for if the user is already signed in. 
            const parsed = JSON.parse(userdata)
            console.log("get data")
            const response = await fetch('https://api.terminalsaturn.com/loginsite', {
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
                const userProfilePicture = JSON.parse(localStorage.getItem("user")).profilepicture;

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
                ems.textContent = `welcome, ${JSON.parse(localStorage.getItem("user"))['username']}.`
                ems.style.display = "block"
                document.getElementsByClassName("spguname")[0].textContent = JSON.parse(localStorage.getItem("user"))['username']
                ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })
                console.log("k")

            }
        }

    //if topbar becomes global consider removing this from index check
    document.getElementsByClassName('spglogout')[0].addEventListener("click", () => {
        const userdata = localStorage.getItem("user")
        if (userdata != "undefined" && userdata != null && localStorage.getItem("ts")){
            logout();
        }
    })
}

})()

//index testing:
//1. log into site fresh with no saved data -- FAIL
//2. Sign out and sign back in -- PASS
//3 refresh site. -- PASS
//4 all offline disconnects function with silenced 404 errors  -- PASS
//5 Information is updated with a fresh copy from server on refresh -- FAIL
// UNSTABLE AS OF 6/14/24