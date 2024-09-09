import * as utils from "./modules.js"
let waitresp = false;
import { SID, awaitSID } from "./wshandler.js";
(async () => {
    //config wss
    await awaitSID()
    let hasRan = false
    function emgrp(){
        if (!hasRan) {
            hasRan = true
        const emgrp = document.getElementsByClassName("emailsign");
        for (const x of [...emgrp]) {
            const animation = x.animate([{ opacity: 0 }], { duration: 250, fill: "forwards" });
            animation.onfinish = () => {
                if (x.id != "emailsign_title") {
                    x.style.display = "none";
                }
                else {
                    x.animate([{ opacity: 1 }], { duration: 250, fill: "forwards" })
                }
            };

        }
    }
    }
    if (!utils.ping()){utils.generateNotification("System", "Server Offline") ;return}
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

    if (!utils.ping()){utils.generateNotification("System", "Server Offline") ;return}


    if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com/") {

        async function Login() {
            const username = document.getElementsByClassName("emailsign")[1]
            const password = document.getElementsByClassName("emailsign")[2]
            const response = await utils.loginSite([username.value, password.value, SID])
            const rdata = await response.json()

            if (typeof rdata === "object") {
                rdata['data'] = json.JSON.parse(rdata['data'])
                localStorage.setItem("user", JSON.stringify(rdata))   
                let iframe = document.getElementById("TOP");
                let sframe = document.getElementById("i_config")
                let spg = document.getElementById("i_set")
                const userProfilePicture = rdata.profilepicture;

                iframe.contentWindow.postMessage([500, userProfilePicture], '*');

                if (utils.getUserData()['admin']) {
                    iframe.contentWindow.postMessage([501], "*")
                }


                let ems = document.getElementById("emailsign_title")
                ems.textContent = `welcome, ${utils.getUserData()['username']}.`
                ems.style.display = "block"
                emgrp()
                window.postMessage("501_l", "*")
                return true

            }
            else if (rdata === 212 || rdata === 213) {
                pulseWrong()
                return
            }

        }
        //end of login

        document.getElementsByClassName('emailsign')[3].addEventListener("click", async () => {
                const checkwait = await Login(false)
        })
        document.getElementsByClassName("emailsign")[4].addEventListener("click", async () => {
            const username = document.getElementsByClassName("emailsign")[1]
            const password = document.getElementsByClassName("emailsign")[2]
                const Data = await fetch("https://terminalsaturn.com/signup", {
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

        })

        let userdata = localStorage.getItem("user")

        if (userdata != "undefined" && userdata != null ) {
            try{
            const parsed = utils.getUserData()
            const response = await utils.loginSite([parsed['username'], parsed['password'], SID])
            const rdata = await response.json()
            if (rdata != 212 && rdata != 213) 
            {
                rdata['data'] = rdata.JSON.parse(result['data'])
                localStorage.setItem("user", JSON.stringify(rdata))
            }
            else if (rdata === 212 || rdata === 213){
                pulseWrong()
            }
 
            if (window.location.href.includes("index") || window.location.href === "https://terminalsaturn.com/") {
                let iframe = document.getElementById("TOP");
                var userProfilePicture = ""
                if (utils.getUserData()) {
                   userProfilePicture =  utils.getUserData().profilepicture
                }

                iframe.contentWindow.postMessage([500, userProfilePicture], '*');


                let ems = document.getElementById("emailsign_title")
                emgrp()
                ems.textContent = `welcome, ${utils.getUserData()['username']}.`
                ems.style.display = "block"

            }
        }catch(err){
            console.log(err)
            utils.generateNotification("Client", "Failed to load data from server")
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