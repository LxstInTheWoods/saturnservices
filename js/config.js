let userdata = localStorage.getItem("user")

if (data != "undefined" && data != null) {
    const parsed = JSON.parse(userdata)
    const response = await fetch('https://api.terminalsaturn.com/loginsite', {
    method: "POST",
    mode: "cors",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([parsed['username', parsed['password']]])
})

for (const x of emgrp) {
    const animation = x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
    animation.onfinish = () => {
        x.style.display = "none";
        let ems = document.getElementById("emailsign_title")
        ems.style.fontSize = "25px"
        ems.textContent = `welcome, ${JSON.parse(localStorage.getItem("user"))['username']}.`
        ems.style.display = "block"
        ems.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" })

        const userProfilePicture = JSON.parse(localStorage.getItem("user")).profilepicture;
        iframe.contentWindow.postMessage([500, userProfilePicture], '*');
        logged = true

        

    };

}
    
}
